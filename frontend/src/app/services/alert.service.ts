import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  async confirm(options: {
    title: string;
    text: string;
    icon?: SweetAlertIcon;
    confirmButtonText?: string;
    cancelButtonText?: string;
  }): Promise<boolean> {
    const result = await Swal.fire({
      title: options.title,
      text: options.text,
      icon: options.icon || 'warning',
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText || 'Yes',
      cancelButtonText: options.cancelButtonText || 'No',
      customClass: {
        popup:
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg',
        title: 'text-lg font-semibold',
        confirmButton:
          'bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded mx-6',
        cancelButton:
          'bg-gray-300 hover:bg-gray-400 text-black dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white font-medium px-4 py-2 rounded',
      },
      buttonsStyling: false,
    });
    return result.isConfirmed;
  }

  success(message: string, title = 'Success') {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      customClass: {
        popup:
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg',
        confirmButton:
          'bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded',
      },
      buttonsStyling: false,
    });
  }

  error(message: string, title = 'Error') {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      customClass: {
        popup:
          'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg',
        confirmButton:
          'bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded',
      },
      buttonsStyling: false,
    });
  }
}
