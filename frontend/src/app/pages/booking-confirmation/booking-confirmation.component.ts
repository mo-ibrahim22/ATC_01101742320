import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ArabicNumbersPipe } from '../../pipes/arabic-numbers.pipe';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-booking-confirmation',
  imports: [CommonModule, RouterModule, ArabicNumbersPipe, DateFormatPipe],
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss'],
})
export class BookingConfirmationComponent implements OnInit {
  booking: Booking | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.loadBooking(bookingId);
    } else {
      this.router.navigate(['/events']);
    }
  }

  loadBooking(bookingId: string): void {
    this.isLoading = true;
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.booking = bookings.find((b) => b._id === bookingId) || undefined;
        this.isLoading = false;

        if (!this.booking) {
          this.router.navigate(['/events']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/events']);
      },
    });
  }

  goToMyBookings(): void {
    this.router.navigate(['/my-bookings']);
  }

  goToEvents(): void {
    this.router.navigate(['/events']);
  }
}
