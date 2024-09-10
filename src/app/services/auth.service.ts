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
      new WorkspaceUseCasesDto(1, [UseCase.WorkspaceRetrieval, UseCase.WorkspaceCreation, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(2, [UseCase.WorkspaceRetrieval, UseCase.WorkspaceCreation, UseCase.WorkspaceDeletion, UseCase.WorkspaceModification]),
      new WorkspaceUseCasesDto(3, [UseCase.WorkspaceRetrieval]),
      new WorkspaceUseCasesDto(4, [UseCase.WorkspaceRetrieval]),
      new WorkspaceUseCasesDto(5, [UseCase.WorkspaceRetrieval]),
      new WorkspaceUseCasesDto(6, [UseCase.WorkspaceRetrieval]),
      new WorkspaceUseCasesDto(7, [UseCase.WorkspaceRetrieval]),
      new WorkspaceUseCasesDto(8, [UseCase.WorkspaceRetrieval]),
      new WorkspaceUseCasesDto(9, [UseCase.WorkspaceRetrieval]),
    ];
  }
}
