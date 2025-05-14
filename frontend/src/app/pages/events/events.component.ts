import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { ArabicNumbersPipe } from "../../pipes/arabic-numbers.pipe";

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    FormsModule,
    EventCardComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ArabicNumbersPipe
],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;
  currentPage = 1;
  totalEvents = 0;
  itemsPerPage = 8;
  categories: string[] = [];
  selectedCategory = '';
  searchQuery = '';

  constructor(
    private eventService: EventService,
    public authService: AuthService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadCategories();
  }

  loadEvents(): void {
    this.isLoading = true;
    const filters: any = {};
    if (this.selectedCategory) filters.category = this.selectedCategory;
    if (this.searchQuery) filters.name = this.searchQuery;

    this.eventService
      .getEvents(this.currentPage, this.itemsPerPage, filters)
      .subscribe({
        next: (response) => {
          this.events = response.events;
          this.totalEvents = response.total;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  loadCategories(): void {
    this.eventService.getEventCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEvents();
  }

  onCategoryChange(): void {
    this.currentPage = 1;
    this.loadEvents();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadEvents();
  }
}
