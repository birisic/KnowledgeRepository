import { Injectable } from '@angular/core';
import { WorkspaceUseCasesDto } from '../dto/workspace-use-cases.dto';
import { UseCase } from '../enums/use-case.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  public getUserWorkspacesUseCases(): WorkspaceUseCasesDto[] {
    return this.initializeUserWorkspaceUseCases();
  }

  // decode the JWT, extract the usecases and construct the DTOs in this method
  private initializeUserWorkspaceUseCases(): WorkspaceUseCasesDto[] {
    return [
      new WorkspaceUseCasesDto(1, [UseCase.WorkspaceCreation, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(2, [UseCase.WorkspaceCreation, UseCase.WorkspaceDeletion, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(3, [UseCase.WorkspaceDeletion]),
      new WorkspaceUseCasesDto(4, []),
      new WorkspaceUseCasesDto(5, []),
      new WorkspaceUseCasesDto(6, []),
      new WorkspaceUseCasesDto(7, []),
      new WorkspaceUseCasesDto(8, []),
      new WorkspaceUseCasesDto(9, []),
    ];
  }
}
