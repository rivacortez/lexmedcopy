import {Injectable, Input} from '@angular/core';
import { Observable, Subject} from "rxjs";


interface Notification {
  message: string;
  description: string;
  type: 'success' | 'error' | 'info';
  imageUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  getNotification(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }

  showNotification(message: string, description: string, type: 'success' | 'error' | 'info', imageUrl: string = ''): void {
    this.notificationSubject.next({ message, description, type, imageUrl });
  }
}
