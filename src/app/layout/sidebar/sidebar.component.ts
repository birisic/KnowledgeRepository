import { Component } from '@angular/core';
import { Workspace } from '../../interfaces/workspace.interface';
import { WorkspaceType } from '../../enums/workspace-type.enum';
import { UseCase } from '../../enums/use-case.enum';
import { WorkspaceUseCasesDto } from '../../dto/workspace-use-cases.dto';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  public WorkspaceType = WorkspaceType;

  public workspaces: Workspace[] = [
    {
        id: 1,
        name: 'New Workspace',
        type: WorkspaceType.Workspace,
        ownerId: 1,
        parentId: null,
    },
    {
        id: 2,
        name: 'Directory 1',
        type: WorkspaceType.Directory,
        ownerId: 1,
        parentId: 1,
    },
    {
        id: 3,
        name: 'Document 1',
        type: WorkspaceType.Document,
        ownerId: 1,
        parentId: 2,
    },
    {
        id: 4,
        name: 'Document 2',
        type: WorkspaceType.Document,
        ownerId: 1,
        parentId: 1,
    },
    {
      id: 5,
      name: 'Directory 2',
      type: WorkspaceType.Directory,
      ownerId: 1,
      parentId: 2,
    },
    {
      id: 6,
      name: 'Document 3',
      type: WorkspaceType.Document,
      ownerId: 1,
      parentId: 5,
    },
  ];

  public userWorkspaceUseCases: WorkspaceUseCasesDto[] = [
    new WorkspaceUseCasesDto(1, [UseCase.WorkspaceRetrieval, UseCase.WorkspaceCreation]),
    new WorkspaceUseCasesDto(2, [UseCase.WorkspaceRetrieval, UseCase.WorkspaceDeletion]),
    new WorkspaceUseCasesDto(3, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(4, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(5, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(6, [UseCase.WorkspaceRetrieval])
  ];

  public hasUseCase(workspaceId: number, useCase: UseCase): boolean {
    const userWorkspace = this.userWorkspaceUseCases.find(item => item.workspaceId === workspaceId);
    return userWorkspace ? userWorkspace.useCases.includes(useCase) : false;
  }

  public getVisibleWorkspaces(): Workspace[] {
    return this.workspaces.filter(workspace => this.hasAccessToWorkspaceAndAncestors(workspace));
  }

  // Recursive function to check if the workspace and all its ancestors have the WorkspaceRetrieval UseCase
  public hasAccessToWorkspaceAndAncestors(workspace: Workspace): boolean {
    if (!this.hasUseCase(workspace.id, UseCase.WorkspaceRetrieval)) {
      return false;
    }

    // if root workspace
    if (!workspace.parentId) {
      return true;
    }

    const parentWorkspace = this.workspaces.find(w => w.id === workspace.parentId);
    return parentWorkspace ? this.hasAccessToWorkspaceAndAncestors(parentWorkspace) : false;
  }

  public getRootWorkspaces(): Workspace[] {
    return this.workspaces.filter(workspace => !workspace.parentId && this.hasAccessToWorkspaceAndAncestors(workspace));
  }

  public getChildWorkspaces(parentWorkspace: Workspace): Workspace[] {  
    return this.workspaces.filter(workspace => parentWorkspace.type !== WorkspaceType.Document 
            && workspace.parentId === parentWorkspace.id 
            && this.hasAccessToWorkspaceAndAncestors(workspace));
  }
  public loguj(workspace: Workspace) {
    console.log(workspace);
  }
}
