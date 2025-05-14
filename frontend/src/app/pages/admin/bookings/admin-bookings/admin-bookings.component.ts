import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../../services/booking.service';
import { Booking } from '../../../../models/booking.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from "../../../../components/loading-spinner/loading-spinner.component";
import { EmptyStateComponent } from "../../../../components/empty-state/empty-state.component";

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.scss'],
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, EmptyStateComponent],
})
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;

  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        console.log('Bookings:', this.bookings);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error(
          this.translate.instant('ADMIN.BOOKINGS_LOAD_ERROR'),
          this.translate.instant('ERRORS.ERROR')
        );
      }
    });
  }

  deleteBooking(bookingId: string): void {
    if (confirm(this.translate.instant('ADMIN.CONFIRM_DELETE_BOOKING'))) {
      this.bookingService.deleteBooking(bookingId).subscribe({
        next: () => {
          this.toastr.success(
            this.translate.instant('ADMIN.BOOKING_DELETED'),
            this.translate.instant('COMMON.SUCCESS')
          );
          this.loadBookings();
        },
        error: () => {
          this.toastr.error(
            this.translate.instant('ADMIN.BOOKING_DELETE_ERROR'),
            this.translate.instant('ERRORS.ERROR')
          );
        }
      });
    }
  }
}