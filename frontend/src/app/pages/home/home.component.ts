import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from '../../components/feature-card/feature-card.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { CountUpModule } from 'ngx-countup';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { ArabicNumbersPipe } from '../../pipes/arabic-numbers.pipe';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FeatureCardComponent,
    HeroSectionComponent,
    CountUpModule,
    RouterModule,
    EventCardComponent,
    ArabicNumbersPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {
  featuredEvents: Event[] = [];
  isLoading = true;

  // CountUp values
  endVal: number = 1000;

  constructor(
    public translate: TranslateService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedEvents();
  }

  loadFeaturedEvents(): void {
    this.eventService.getEvents(1, 4).subscribe({
      next: (response) => {
        this.featuredEvents = response.events;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
