import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/events/`);
  }

  createEvent(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/events/`,
      body,
      httpOptions
    );
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/events/${id}`);
  }

  purchseEventTickets(id: string, body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/events/${id}/purchase`,
      body,
      httpOptions
    );
  }
}
