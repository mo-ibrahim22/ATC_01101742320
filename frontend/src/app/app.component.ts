import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { isPlatformBrowser } from '@angular/common';  // Import isPlatformBrowser

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'event-booking';

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID
  ) {}

  ngOnInit(): void {
    // Ensure we are in the browser before interacting with localStorage
    if (isPlatformBrowser(this.platformId)) {
      // Apply the theme on app initialization
      this.themeService.darkMode$.subscribe(darkMode => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    }
  }
}
