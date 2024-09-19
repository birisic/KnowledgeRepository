import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from '../../../interfaces/auth-request';
import { ToastService } from '../../../services/toast.service';
import { ToastStatus } from '../../../enums/toast-status.enum';
import { LoginService } from '../../business-logic/api/login.service';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm!: FormGroup;

  public constructor(
    private toastService: ToastService,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
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
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  public login(): void {
    const loginData: AuthRequest = this.getLoginData();
        
    this.loginService.requestToken(loginData).subscribe({
      next: (data) => { 
        this.authService.setJwtTokenInLocalStorage(data.token);

        this.router.navigateByUrl('/');
        this.toastService.show("Successfully logged in.", ToastStatus.Success);
      },
      error: (err) => {
        switch (err.status) {
          case HttpStatusCode.Unauthorized:
            this.toastService.show("Failed login attempt. Please check your details and try again.", ToastStatus.Danger);
            break;
          case HttpStatusCode.Conflict:
            this.toastService.show("An error occured on the server. Please try again.", ToastStatus.Warning);
            break;
          case HttpStatusCode.InternalServerError:
            this.toastService.show("An error occured on the server. Please try again later.", ToastStatus.Danger);
            break;
          case HttpStatusCode.UnprocessableEntity:
            this.toastService.show(err.error[0].error, ToastStatus.Danger);
            break;
          default:
            this.toastService.show("An error occurred on the server. Please try again.", ToastStatus.Danger);
            break;
        }
      }
    });
  }

  public getLoginData(): AuthRequest {
      let formValue = this.loginForm.getRawValue();

      return {
        username: formValue.username,
        password: formValue.password,
      }
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
