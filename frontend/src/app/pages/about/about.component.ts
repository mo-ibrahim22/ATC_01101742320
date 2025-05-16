import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FeatureCardComponent } from "../../components/feature-card/feature-card.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [FeatureCardComponent, HeroSectionComponent,CommonModule,RouterModule]
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Muhammad Ibrahim',
      role: 'Founder & Developer',
      image: 'assets/images/developer.jpg',
      bio: 'Full-stack developer with a passion for creating seamless event experiences.'
    }
  ];

  constructor(public translate: TranslateService) {}
}