import { Injectable } from '@angular/core';
import { WorkspaceUseCasesDto } from '../dto/workspace-use-cases.dto';
import { UseCase } from '../enums/use-case.enum';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userWorkspacesUseCases: WorkspaceUseCasesDto[] = [];
  private localStorageTokenKey: string = "token";
  private jwtHelper: JwtHelperService;

  public constructor(
    private router: Router,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  public getUserWorkspacesUseCases(): WorkspaceUseCasesDto[] {
    return this.initializeUserWorkspaceUseCases();
  }

  // decode the JWT, extract the usecases and construct the DTOs in this method (za ispit)
  private initializeUserWorkspaceUseCases(): WorkspaceUseCasesDto[] {
    const token = this.getJwtTokenFromLocalStorage();
    if (!token) {
      return [];
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    
    const workspacesData = JSON.parse(decodedToken.Workspaces);

    this.userWorkspacesUseCases = workspacesData.map((workspace: any) => 
      new WorkspaceUseCasesDto(workspace.WorkspaceId, workspace.UseCaseIds)
    );

    return this.userWorkspacesUseCases;
  }

  public getJwtTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.localStorageTokenKey);    ;
  }

  public setJwtTokenInLocalStorage(token: string): void {
    localStorage.setItem(this.localStorageTokenKey, token);
  }

  public getJwtTokenData(): string | null {
    const token = this.getJwtTokenFromLocalStorage();

    if (token === null) {
      return null;
    }

    return this.jwtHelper.decodeToken(token);
  }

  public isLoggedIn(): boolean {
    return !!this.getJwtTokenFromLocalStorage();
  }

  public logout(): void {
    localStorage.removeItem(this.localStorageTokenKey);
    this.router.navigateByUrl("/login");
  }
}
