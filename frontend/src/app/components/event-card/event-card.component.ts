import { Component, Input } from '@angular/core';
import { Event } from '../../models/event.model';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { BookingService } from '../../services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ArabicNumbersPipe } from '../../pipes/arabic-numbers.pipe';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-event-card',
  imports: [
    CommonModule,
    DateFormatPipe,
    TruncatePipe,
    RouterModule,
    ArabicNumbersPipe,
  ],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
  @Input() event!: Event;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private bookingService: BookingService,
    public authService: AuthService,
    private alertService: AlertService,

    private toastr: ToastrService
  ) {}

  viewDetails(eventId: string): void {
    this.router.navigate(['/events', eventId]);
  }

  bookEvent(eventId: string): void {
    if (!eventId) return;

    this.bookingService.bookEvent(eventId).subscribe({
      next: (booking) => {
        this.toastr.success(
          this.translate.instant('BOOKING.SUCCESS_MESSAGE'),
          this.translate.instant('COMMON.SUCCESS')
        );
        this.router.navigate(['/booking-confirmation', booking._id]);
      },
      error: () => {
        this.toastr.error(
          this.translate.instant('BOOKING.ERROR_MESSAGE'),
          this.translate.instant('ERRORS.ERROR')
        );
      },
    });
  }

  cancelBooking(bookingId: string): void {
    if (!bookingId) {
      this.toastr.error(
        this.translate.instant('BOOKING.CANCEL_ERROR_MESSAGE'),
        this.translate.instant('ERRORS.ERROR')
      );
      return;
    }

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
                this.translate.instant('BOOKING.CANCEL_SUCCESS_MESSAGE'),
                this.translate.instant('COMMON.SUCCESS')
              );
              this.event.isBooked = false;
              this.event.bookingId = '';
            },
            error: () => {
              this.toastr.error(
                this.translate.instant('BOOKING.CANCEL_ERROR_MESSAGE'),
                this.translate.instant('ERRORS.ERROR')
              );
            },
          });
        }
      });
  }
}
