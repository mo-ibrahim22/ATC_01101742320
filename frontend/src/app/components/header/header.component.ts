import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { TruncatePipe } from "../../pipes/truncate.pipe";

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    LanguageSwitcherComponent,
    ThemeSwitcherComponent,
    TruncatePipe
],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false;
  isProfileMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {}

  toggleMenu(): void {
    if (this.isProfileMenuOpen) {
      this.isProfileMenuOpen = false;
    }
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout(): void {
    this.isMenuOpen = false;
    this.isProfileMenuOpen = false;
    this.authService.logout();
  }
}
