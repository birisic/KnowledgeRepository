import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastStatus } from '../enums/toast-status.enum';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  public showToast$ = new BehaviorSubject<boolean>(false);
  public toastMessage$ = new BehaviorSubject<string>('');
  public toastStatus$ = new BehaviorSubject<string>('');
  private toastTimeout: any;

  public show(message: string, status: ToastStatus): void {
    this.toastMessage$.next(message);
    this.toastStatus$.next(status);
    this.showToast$.next(true);

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.showToast$.next(false);
    }, 5000);
  }
}
