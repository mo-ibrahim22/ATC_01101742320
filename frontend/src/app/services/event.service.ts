import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get paginated & filtered list of events.
   */
  getEvents(
    page = 1,
    limit = 10,
    filters?: any
  ): Observable<{ events: Event[]; total: number }> {
    let params: any = { page, limit };
    if (filters) {
      params = { ...params, ...filters };
    }

    return this.http.get<any>(`${this.apiUrl}/events`, { params }).pipe(
      map((response) => ({
        events: response.data.events,
        total: response.results,
      }))
    );
  }

  /**
   * Get a single event with its booking status.
   */
  getEvent(id: string): Observable<{ event: Event; isBooked: boolean }> {
    return this.http.get<any>(`${this.apiUrl}/events/${id}`).pipe(
      map((response) => ({
        event: response.data.event,
        isBooked: response.data.isBooked,
      }))
    );
  }

  /**
   * Create a new event (admin).
   */
  createEvent(eventData: FormData): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/events`, eventData);
  }

  /**
   * Update an existing event (admin).
   */
  updateEvent(id: string, eventData: FormData): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/events/${id}`, eventData);
  }

  /**
   * Delete an event by ID (admin).
   */
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/events/${id}`);
  }

  /**
   * Get list of categories from event statistics.
   */
  getEventCategories(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/events/stats`).pipe(
      map((response) => response.data.stats.map((stat: any) => stat._id))
    );
  }
}
