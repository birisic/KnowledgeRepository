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
  public tokenData!: string | null;

  public constructor(
    private router: Router,
  ) {}

  public getUserWorkspacesUseCases(): WorkspaceUseCasesDto[] {
    return this.initializeUserWorkspaceUseCases();
  }

  // decode the JWT, extract the usecases and construct the DTOs in this method (za ispit)
  private initializeUserWorkspaceUseCases(): WorkspaceUseCasesDto[] {
    this.userWorkspacesUseCases = [
      new WorkspaceUseCasesDto(1, [UseCase.WorkspaceCreation, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(2, [UseCase.WorkspaceCreation, UseCase.WorkspaceDeletion, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(3, [UseCase.WorkspaceCreation, UseCase.WorkspaceDeletion, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(4, [UseCase.WorkspaceCreation, UseCase.WorkspaceDeletion, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(5, [UseCase.WorkspaceModification, UseCase.WorkspaceDeletion]),
      new WorkspaceUseCasesDto(6, [UseCase.WorkspaceModification, UseCase.WorkspaceDeletion]),
      new WorkspaceUseCasesDto(7, [UseCase.WorkspaceModification, UseCase.WorkspaceDeletion]),
      new WorkspaceUseCasesDto(8, [UseCase.WorkspaceModification, UseCase.WorkspaceDeletion])
    ];

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

    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  public decodeToken(): void {
    this.tokenData = this.getJwtTokenData();
  }

  public logout(): void {
    localStorage.removeItem(this.localStorageTokenKey);
    this.router.navigateByUrl("/login");
  }
}
