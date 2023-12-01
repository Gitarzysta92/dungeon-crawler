import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Notification } from "../models/notification";


@Injectable({ providedIn: 'root'})
export class NotificationsService {

  constructor(
    private readonly _httpClient: HttpClient,
  ) {}

  getMyNotifications(): Observable<Notification[]> {
    return of([]);
  }
  
  updateNotification(n: Notification): Observable<boolean> {
    return of(true);
  }

  addNotification(n: Notification): Observable<boolean> {
    return of(true);
  }
}