import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  standalone: true,
})
export class HeroSectionComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imageUrl: string = 'assets/images/hero-default.jpg';
  @Input() ctaText: string = 'Get Started';
  @Input() ctaLink: string = '/events';

  constructor(public translate: TranslateService) {}
}
