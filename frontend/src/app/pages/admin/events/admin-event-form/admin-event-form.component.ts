import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-event-form.component.html',
  styleUrls: ['./admin-event-form.component.scss'],
})
export class AdminEventFormComponent implements OnInit {
  eventForm!: FormGroup;
  isEditMode = false;
  eventId: string | null = null;
  isLoading = false;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      availableTickets: ['', [Validators.required, Validators.min(1)]],
      tags: [''],
      image: [null as File | null],
    });

    this.eventId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.eventId;

    if (this.isEditMode) {
      this.loadEvent(this.eventId!);
    }
  }
  loadEvent(eventId: string): void {
    this.isLoading = true;
    this.eventService.getEvent(eventId).subscribe({
      next: (response) => {
        const event = response.event; // Access the event from the response
        this.eventForm.patchValue({
          name: event.name,
          description: event.description,
          category: event.category,
          date: new Date(event.date).toISOString().substring(0, 16),
          venue: event.venue,
          price: event.price.toString(),
          availableTickets: event.availableTickets.toString(),
          tags: event.tags?.join(', '),
        });
        this.imagePreview = event.image || null;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/admin/events']);
      },
    });
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.eventForm.patchValue({ image: file });
      this.eventForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.eventForm.invalid) return;

    this.isLoading = true;
    const formData = new FormData();
    Object.keys(this.eventForm.controls).forEach((key) => {
      const value = this.eventForm.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    if (this.isEditMode) {
      this.eventService.updateEvent(this.eventId!, formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success(
            this.translate.instant('ADMIN.EVENT_UPDATED'),
            this.translate.instant('COMMON.SUCCESS')
          );
          this.router.navigate(['/admin/events']);
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error(
            this.translate.instant('ADMIN.UPDATE_ERROR'),
            this.translate.instant('ERRORS.ERROR')
          );
        },
      });
    } else {
      this.eventService.createEvent(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success(
            this.translate.instant('ADMIN.EVENT_CREATED'),
            this.translate.instant('COMMON.SUCCESS')
          );
          this.router.navigate(['/admin/events']);
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error(
            this.translate.instant('ADMIN.CREATE_ERROR'),
            this.translate.instant('ERRORS.ERROR')
          );
        },
      });
    }
  }
}
