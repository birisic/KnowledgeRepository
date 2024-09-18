import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public form = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
    },
  };

  public onSubmit(): void {
    this.form.errors = { username: '', password: ''};

    //validate username
    if (!this.form.username) {
      this.form.errors.username = 'Username is required.';
    } else if (this.form.username.length < 5) {
      this.form.errors.username = 'Username must be at least 5 characters long.';
    }

    //validate password
    if (!this.form.password) {
      this.form.errors.password = 'Password is required.';
    } else if (!this.isValidPassword(this.form.password)) {
      this.form.errors.password = 'Password must be at least 8 characters long, contain at least 1 uppercase letter and 1 number.';
    }

    if (!this.form.errors.username && !this.form.errors.password) {
      console.log('Form Submitted:', this.form);
    }
  }

  private isValidPassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordPattern.test(password);
  }
}
