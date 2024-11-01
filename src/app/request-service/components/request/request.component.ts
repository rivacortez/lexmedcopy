import {Component, inject, ViewChild} from '@angular/core';
import {AddRequestComponent} from "../add-request/add-request.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {RequestService} from "../../service/request.service";
import {RequestServiceEntity} from "../../model/request-service.entity";
import {HttpClientModule} from '@angular/common/http';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';
import {AppModule} from '../../../app.module';
import {FooterContentComponent} from '../../../public/components/footer-content/footer-content.component';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    HttpClientModule,
    AddRequestComponent,
    ToolbarContentComponent,

    FooterContentComponent
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  editMode: boolean = false;
  dataSource = new MatTableDataSource<RequestServiceEntity>();
  private requestService: RequestService = inject(RequestService);
  requestData: RequestServiceEntity = new RequestServiceEntity({});

  constructor() {}

  onEditItem(item: RequestServiceEntity) {
    this.editMode = true;
    this.requestData = item;
  }

  onDeleteItem(item: RequestServiceEntity) {
    this.deleteRequest(item.id);
  }

  onCancelRequested() {
    this.resetEditState();
    this.getAllRequests();
  }

  onRequestAddRequested(item: RequestServiceEntity) {
    this.requestData = item;
    this.createRequest();
    this.resetEditState();
  }

  onRequestUpdateRequested(item: RequestServiceEntity) {
    this.requestData = item;
    this.updateRequest();
    this.resetEditState();
  }

  private resetEditState() {
    this.requestData = new RequestServiceEntity({});
    this.editMode = false;
  }

  private getAllRequests() {
    this.requestService.getAll().subscribe((response: RequestServiceEntity[]) => {
      this.dataSource.data = response;
    });
  }

  private createRequest() {
    this.requestData.creationDate = new Date().toISOString();
    this.requestService.create(this.requestData).subscribe((response: RequestServiceEntity) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  private updateRequest() {
    const requestToUpdate = this.requestData;
    this.requestService.update(requestToUpdate.id, requestToUpdate).subscribe((response: RequestServiceEntity) => {
      const index = this.dataSource.data.findIndex((request: RequestServiceEntity) => request.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  private deleteRequest(id: number) {
    this.requestService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((request: RequestServiceEntity) => request.id !== id);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllRequests();
  }

  handleRequestAdd($event: RequestServiceEntity) {

  }
}
