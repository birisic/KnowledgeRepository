import { Injectable } from '@angular/core';
import { WorkspaceUseCasesDto } from '../dto/workspace-use-cases.dto';
import { UseCase } from '../enums/use-case.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userWorkspacesUseCases: WorkspaceUseCasesDto[] = [];
  public constructor() {}

  public getUserWorkspacesUseCases(): WorkspaceUseCasesDto[] {
    return this.initializeUserWorkspaceUseCases();
  }

  // decode the JWT, extract the usecases and construct the DTOs in this method (za ispit)
  private initializeUserWorkspaceUseCases(): WorkspaceUseCasesDto[] {
    this.userWorkspacesUseCases = [
      new WorkspaceUseCasesDto(1, [UseCase.WorkspaceCreation, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(2, [UseCase.WorkspaceCreation, UseCase.WorkspaceDeletion, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(3, [UseCase.WorkspaceModification, UseCase.WorkspaceDeletion]),
    ];

    return this.userWorkspacesUseCases;
  }
}
