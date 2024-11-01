import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ToolbarContentComponent} from "../../../public/components/toolbar-content/toolbar-content.component";
import {RequestServiceEntity} from "../../model/request-service.entity";
import {RequestService} from "../../service/request.service";
import {NotificationService} from "../../service/notification.service";
import {StatusService} from '../../service/status.service';
import {StatusEntity} from '../../model/status.entity';
import {catchError, debounceTime, distinctUntilChanged, forkJoin, fromEvent, of} from 'rxjs';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {AppModule} from '../../../app.module';
import {FooterContentComponent} from '../../../public/components/footer-content/footer-content.component';

@Component({
  selector: 'app-list-request',
  standalone: true,
  imports: [
    MatLabel,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatSortHeader,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    NgClass,
    MatRowDef,
    MatPaginator,
    MatSort,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    MatFormField,
    NgIf,
    MatInput,
    MatIconButton,
    MatCardTitle,
    DatePipe,
    ToolbarContentComponent,
    MatSelect,
    MatOption,
    NgForOf,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggle,
    MatButtonToggleGroup,
    FooterContentComponent
  ],
  templateUrl: './list-request.component.html',
  styleUrl: './list-request.component.css'
})
export class ListRequestComponent   implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'type', 'inquiry', 'subject', 'creationDate', 'actions'];
  dataSource = new MatTableDataSource<RequestServiceEntity>();
  statuses: StatusEntity[] = [];
  isLoading = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('filterInput', { static: false }) filterInput!: ElementRef<HTMLInputElement>;

  constructor(
    private requestService: RequestService,
    private statusService: StatusService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.setupFilter();
  }

  loadData(): void {
    this.isLoading = true;
    this.requestService.getAll().subscribe(
      requests => {
        this.dataSource.data = requests;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading requests:', error);
        this.isLoading = false;
      }
    );
    this.loadStatuses();
  }

  loadStatuses(): void {
    this.statusService.getAllStatuses().subscribe(
      statuses => this.statuses = statuses,
      error => console.error('Error loading statuses:', error)
    );
  }

  onStatusChange(request: RequestServiceEntity, statusId: number): void {
    request.statusId = statusId;

    this.requestService.updateRequest(request).pipe(
      catchError(error => {
        this.notificationService.showNotification(
          'Error',
          `No se pudo actualizar el estado para la solicitud ${request.subject}.`,
          'error',
          'path/to/error-image.jpg'
        );
        console.error('Error updating status:', error);
        return of(null);
      })
    ).subscribe(() => {
      const statusName = this.statuses.find(status => status.id === statusId)?.name || 'unknown';
      this.notificationService.showNotification(
        'Éxito',
        `El estado de la solicitud ${request.subject} ha sido actualizado a ${statusName}.`,
        'success',
        'path/to/success-image.jpg'
      );
      this.loadData();
    });
  }

  setupFilter(): void {
    if (this.filterInput) {
      fromEvent(this.filterInput.nativeElement, 'input').pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
        const filterValue = this.filterInput.nativeElement.value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      });
    } else {
      console.error('filterInput is not defined');
    }
  }
}
