import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})

export class ToastComponent {
  public showToast = false;
  public toastMessage = '';
  public toastStatus: string = '';

  public constructor(private toastService: ToastService) {}

  public ngOnInit(): void {
    this.toastService.showToast$.subscribe(show => this.showToast = show);
    this.toastService.toastMessage$.subscribe(message => this.toastMessage = message);
    this.toastService.toastStatus$.subscribe(status => this.toastStatus = status);
  }
}
