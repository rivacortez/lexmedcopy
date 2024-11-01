import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {RequestServiceEntity} from '../../model/request-service.entity';
import {RequestService} from '../../service/request.service';
import {DatePipe} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {StatusEntity} from '../../model/status.entity';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';
import {AppModule} from '../../../app.module';

@Component({
  selector: 'app-request-history',
  standalone: true,
  imports: [
    MatTable,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    DatePipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    MatLabel,
    ToolbarContentComponent,

  ],
  templateUrl: './request-history.component.html',
  styleUrl: './request-history.component.css'
})
export class RequestHistoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'type', 'inquiry', 'subject', 'description', 'creationDate', 'status'];
  dataSource = new MatTableDataSource<RequestServiceEntity>();
  statuses: StatusEntity[] = [];

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadStatuses();
  }

  loadStatuses(): void {
    this.requestService.getStatuses().subscribe((statuses: StatusEntity[]) => {
      this.statuses = statuses;
      this.loadUserRequests();
    });
  }

  loadUserRequests(): void {
    this.requestService.getAll().subscribe((requests: RequestServiceEntity[]) => {
      this.dataSource.data = requests.map(request => {
        const statusName = this.getStatusName(request.statusId);
        return { ...request, status: { id: request.statusId, name: statusName, description: '' } };
      });
    });
  }

  getStatusName(statusId: number): string {
    const status = this.statuses.find(s => s.id === statusId);
    return status ? status.name : 'Desconocido';
  }
}
