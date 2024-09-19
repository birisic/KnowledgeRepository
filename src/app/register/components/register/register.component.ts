import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthRequest } from '../../../interfaces/auth-request';
import { ToastStatus } from '../../../enums/toast-status.enum';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { RegisterService } from '../../business-logic/api/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerForm!: FormGroup;

  public constructor(
    private toastService: ToastService,
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)/) //at least 1 uppercase and 1 number
      ])
    });
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      this.register();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  public register(): void {
    const registerData: AuthRequest = this.getRegisterData();
  
    this.registerService.register(registerData).subscribe({
      next: (response: HttpResponse<void>) => {
        this.router.navigateByUrl('/login');
        this.toastService.show("Registration successful. Please log in.", ToastStatus.Success);
      },
      error: (err) => {        
        switch (err.status) {
          case HttpStatusCode.Conflict:
            this.toastService.show("Username already taken.", ToastStatus.Warning);
            break;
          case HttpStatusCode.UnprocessableEntity:
            this.toastService.show(err.error[0].error, ToastStatus.Danger);
            break;
          default:
            this.toastService.show("An error occurred. Please try again later.", ToastStatus.Danger);
            break;
        }
      }
    });
  }

  public getRegisterData(): AuthRequest {
      let formValue = this.registerForm.getRawValue();

      return {
        username: formValue.username,
        password: formValue.password,
      }
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
}
