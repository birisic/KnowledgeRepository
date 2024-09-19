import { Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private isPublicRoute(state: RouterStateSnapshot): boolean {
    const url = state.url;    
    return url.includes('login') || url.includes('register');
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn: boolean = this.authService.isLoggedIn();
    const isPublic: boolean = this.isPublicRoute(state);
    if (isLoggedIn && isPublic) {
      this.router.navigateByUrl('/');
      return false;
    }

    if (!isLoggedIn && !isPublic) {     
     
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }

  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }
}