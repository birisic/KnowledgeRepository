import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login");    
  }
}
