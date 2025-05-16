import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us'
  },
  { 
    path: 'events', 
    loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent),
    title: 'Events'
  },
  { 
    path: 'events/:id', 
    loadComponent: () => import('./pages/event-details/event-details.component').then(m => m.EventDetailsComponent),
    title: 'Event Details'
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent),
    title: 'Register'
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
    title: 'Profile'
  },
  { 
    path: 'my-bookings', 
    loadComponent: () => import('./pages/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent),
    canActivate: [authGuard],
    title: 'My Bookings'
  },
  { 
    path: 'booking-confirmation/:id', 
    loadComponent: () => import('./pages/booking-confirmation/booking-confirmation.component').then(m => m.BookingConfirmationComponent),
    canActivate: [authGuard],
    title: 'Booking Confirmation'
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard],
    title: 'Admin Dashboard',
    children: [
      { 
        path: 'events', 
        loadComponent: () => import('./pages/admin/events/admin-events/admin-events.component').then(m => m.AdminEventsComponent),
        title: 'Manage Events'
      },
      { 
        path: 'events/new', 
        loadComponent: () => import('./pages/admin/events/admin-event-form/admin-event-form.component').then(m => m.AdminEventFormComponent),
        title: 'Create Event'
      },
      { 
        path: 'events/:id/edit', 
        loadComponent: () => import('./pages/admin/events/admin-event-form/admin-event-form.component').then(m => m.AdminEventFormComponent),
        title: 'Edit Event'
      },
      { 
        path: 'bookings', 
        loadComponent: () => import('./pages/admin/bookings/admin-bookings/admin-bookings.component').then(m => m.AdminBookingsComponent),
        title: 'Manage Bookings'
      },
      { 
        path: 'users', 
        loadComponent: () => import('./pages/admin/users/admin-users/admin-users.component').then(m => m.AdminUsersComponent),
        title: 'Manage Users'
      },
      { path: '', redirectTo: 'events', pathMatch: 'full' }
    ]
  },
  { 
    path: '**', 
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found'
  }
];

export const appPipes = [
  DateFormatPipe,
  FilterPipe,
  SafeHtmlPipe,
  TruncatePipe
];