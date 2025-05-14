import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  event: Event | null = null;
  isLoading = true;
  isBooked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private bookingService: BookingService,
    public authService: AuthService,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEvent(eventId);
    } else {
      this.router.navigate(['/']);
    }
  }

  loadEvent(eventId: string): void {
    this.isLoading = true;
    this.eventService.getEvent(eventId).subscribe({
      next: (response) => {
        this.event = response.event;
        this.isBooked = response.isBooked;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
    });
  }

  bookEvent(): void {
    if (!this.event) return;

    this.bookingService.bookEvent(this.event._id).subscribe({
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
  goBackToEvents(): void {
    this.router.navigate(['/']);
  }
  goToLogin(): void {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }
}
