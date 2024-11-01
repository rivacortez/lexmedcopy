import {StatusEntity} from './status.entity';


export class RequestServiceEntity {
  id: number;
  userId: number;
  type: string;
  inquiry: string;
  subject: string;
  description: string;
  creationDate: string;
  statusId: number;
  status?: StatusEntity;

  constructor(requestService: {
    id?: number;
    userId?: number;
    type?: string;
    inquiry?: string;
    subject?: string;
    description?: string;
    creationDate?: string;
    statusId?: number;
    status?: StatusEntity;
  }) {
    this.id = requestService.id || 0;
    this.userId = requestService.userId || 0;
    this.type = requestService.type || '';
    this.inquiry = requestService.inquiry || '';
    this.subject = requestService.subject || '';
    this.description = requestService.description || '';
    this.creationDate = requestService.creationDate || '';
    this.statusId = requestService.statusId || 0;
    this.status = requestService.status || undefined;
  }
}



