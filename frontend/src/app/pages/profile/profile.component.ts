import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  isEditing = false;
  isChangingPassword = false;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadUserProfile();
  }

  initForms(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      language: ['en', [Validators.required]],
      photo: [null as File | null],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  loadUserProfile(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        language: user.language,
      });
      this.imagePreview = user.photo || null;
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ photo: file });
      this.profileForm.get('photo')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.profileForm.controls).forEach((key) => {
      const value = this.profileForm.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    this.userService.updateMe(formData).subscribe({
      next: (user) => {
        this.authService.updateUser(user);
        this.isEditing = false;
        this.toastr.success(
          this.translate.instant('PROFILE.UPDATE_SUCCESS'),
          this.translate.instant('COMMON.SUCCESS')
        );
        this.translate.use(user.language);
      },
      error: () => {
        this.toastr.error(
          this.translate.instant('PROFILE.UPDATE_ERROR'),
          this.translate.instant('ERRORS.ERROR')
        );
      },
    });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    this.userService.updatePassword(currentPassword!, newPassword!, confirmPassword!).subscribe({
      next: () => {
        this.isChangingPassword = false;
        this.passwordForm.reset();
        this.toastr.success(
          this.translate.instant('PROFILE.PASSWORD_UPDATED'),
          this.translate.instant('COMMON.SUCCESS')
        );
      },
      error: () => {
        this.toastr.error(
          this.translate.instant('PROFILE.PASSWORD_UPDATE_ERROR'),
          this.translate.instant('ERRORS.ERROR')
        );
      },
    });
  }

  deleteAccount(): void {
    if (confirm(this.translate.instant('PROFILE.CONFIRM_DELETE_ACCOUNT'))) {
      this.userService.deleteMe().subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/']);
          this.toastr.success(
            this.translate.instant('PROFILE.ACCOUNT_DELETED'),
            this.translate.instant('COMMON.SUCCESS')
          );
        },
        error: () => {
          this.toastr.error(
            this.translate.instant('PROFILE.DELETE_ERROR'),
            this.translate.instant('ERRORS.ERROR')
          );
        },
      });
    }
  }
}
