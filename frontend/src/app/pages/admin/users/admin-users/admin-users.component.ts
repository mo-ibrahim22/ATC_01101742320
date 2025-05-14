import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from "../../../../components/loading-spinner/loading-spinner.component";
import { EmptyStateComponent } from "../../../../components/empty-state/empty-state.component";

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
    private toastr: ToastrService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
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
    if (confirm(this.translate.instant('ADMIN.CONFIRM_DELETE_USER'))) {
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
  }

  toggleAdminStatus(user: User): void {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
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
}
