import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Book an event by event ID
   */
  bookEvent(eventId: string): Observable<Booking> {
    return this.http.post<any>(`${this.apiUrl}/bookings/${eventId}`, {}).pipe(
      map(res => res.data.booking)
    );
  }

  /**
   * Get bookings for the currently logged-in user
   */
  getUserBookings(): Observable<Booking[]> {
    return this.http.get<any>(`${this.apiUrl}/bookings/my-bookings`).pipe(
      map(res => res.data.bookings)
    );
  }

  /**
   * Get all bookings (Admin)
   */
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<any>(`${this.apiUrl}/bookings`).pipe(
      map(res => res.data.bookings)
    );
  }

  /**
   * Delete a booking by ID
   */
  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/bookings/${id}`);
  }
}
