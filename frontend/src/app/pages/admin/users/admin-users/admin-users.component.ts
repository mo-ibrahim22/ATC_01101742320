import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../components/empty-state/empty-state.component';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule, LoadingSpinnerComponent, EmptyStateComponent],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private toastr: ToastrService,
    private alertService: AlertService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.users = users.filter((user) => user._id !== currentUser._id);
        } else {
          this.users = users;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error(
          this.translate.instant('ADMIN.USERS_LOAD_ERROR'),
          this.translate.instant('ERRORS.ERROR')
        );
      },
    });
  }

  deleteUser(userId: string): void {
    this.alertService
      .confirm({
        title: this.translate.instant('ADMIN.CONFIRM_DELETE_TITLE'),
        text: this.translate.instant('ADMIN.CONFIRM_DELETE_USER'),
        icon: 'warning',
        confirmButtonText: this.translate.instant('COMMON.YES'),
        cancelButtonText: this.translate.instant('COMMON.NO'),
      })
      .then((confirmed) => {
        if (confirmed) {
          this.userService.deleteUser(userId).subscribe({
            next: () => {
              this.toastr.success(
                this.translate.instant('ADMIN.USER_DELETED'),
                this.translate.instant('COMMON.SUCCESS')
              );
              this.loadUsers();
            },
            error: () => {
              this.toastr.error(
                this.translate.instant('ADMIN.USER_DELETE_ERROR'),
                this.translate.instant('ERRORS.ERROR')
              );
            },
          });
        }
      });
  }

  toggleAdminStatus(user: User): void {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const confirmText =
      newRole === 'admin'
        ? this.translate.instant('ADMIN.CONFIRM_MAKE_ADMIN')
        : this.translate.instant('ADMIN.CONFIRM_REMOVE_ADMIN');

    this.alertService
      .confirm({
        title: this.translate.instant('ADMIN.CONFIRM_UPDATE_TITLE'),
        text: confirmText,
        icon: 'question',
        confirmButtonText: this.translate.instant('COMMON.YES'),
        cancelButtonText: this.translate.instant('COMMON.NO'),
      })
      .then((confirmed) => {
        if (confirmed) {
          this.userService.updateUser(user._id, { role: newRole }).subscribe({
            next: () => {
              this.toastr.success(
                this.translate.instant('ADMIN.USER_UPDATED'),
                this.translate.instant('COMMON.SUCCESS')
              );
              this.loadUsers();
            },
            error: () => {
              this.toastr.error(
                this.translate.instant('ADMIN.USER_UPDATE_ERROR'),
                this.translate.instant('ERRORS.ERROR')
              );
            },
          });
        }
      });
  }
}
