import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { ArabicNumbersPipe } from '../../pipes/arabic-numbers.pipe';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-my-bookings',
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ArabicNumbersPipe,
    DateFormatPipe,
  ],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;

  constructor(
    private bookingService: BookingService,
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private toastr: ToastrService,

    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error(
          this.translate.instant('BOOKING.LOAD_ERROR'),
          this.translate.instant('ERRORS.ERROR')
        );
      },
    });
  }

  cancelBooking(bookingId: string): void {
    this.alertService
      .confirm({
        title: this.translate.instant('BOOKING.CONFIRM_CANCEL_TITLE'),
        text: this.translate.instant('BOOKING.CONFIRM_CANCEL_TEXT'),
        confirmButtonText: this.translate.instant('COMMON.YES'),
        cancelButtonText: this.translate.instant('COMMON.NO'),
      })
      .then((confirmed) => {
        if (confirmed) {
          this.bookingService.deleteBooking(bookingId).subscribe({
            next: () => {
              this.toastr.success(
                this.translate.instant('BOOKING.CANCEL_SUCCESS'),
                this.translate.instant('COMMON.SUCCESS')
              );
              this.loadBookings();
            },
            error: () => {
              this.toastr.error(
                this.translate.instant('BOOKING.CANCEL_ERROR'),
                this.translate.instant('ERRORS.ERROR')
              );
            },
          });
        }
      });
  }
}
