import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { Event } from '../../../../models/event.model';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../components/empty-state/empty-state.component';
import { ArabicNumbersPipe } from '../../../../pipes/arabic-numbers.pipe';
import { DateFormatPipe } from '../../../../pipes/date-format.pipe';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-admin-events',
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ArabicNumbersPipe,
    DateFormatPipe,
  ],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss'],
})
export class AdminEventsComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;

  constructor(
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService,
    private alertService: AlertService,

    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventService.getEvents().subscribe({
      next: (response) => {
        this.events = response.events;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  deleteEvent(eventId: string): void {
    this.alertService
      .confirm({
        title: this.translate.instant('ADMIN.CONFIRM_DELETE_TITLE'),
        text: this.translate.instant('ADMIN.CONFIRM_DELETE'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('COMMON.YES'),
        cancelButtonText: this.translate.instant('COMMON.NO'),
      })
      .then((confirmed) => {
        if (confirmed) {
          this.eventService.deleteEvent(eventId).subscribe({
            next: () => {
              this.toastr.success(
                this.translate.instant('ADMIN.EVENT_DELETED'),
                this.translate.instant('COMMON.SUCCESS')
              );
              this.loadEvents();
            },
            error: () => {
              this.toastr.error(
                this.translate.instant('ADMIN.DELETE_ERROR'),
                this.translate.instant('ERRORS.ERROR')
              );
            },
          });
        }
      });
  }
}
