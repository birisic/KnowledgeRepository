import { Component } from '@angular/core';
import { Workspace } from '../../interfaces/workspace.interface';
import { WorkspaceType } from '../../enums/workspace-type.enum';
import { UseCase } from '../../enums/use-case.enum';
import { WorkspaceUseCasesDto } from '../../dto/workspace-use-cases.dto';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('toggleAnimation', [
      state(
        'open',
        style({
          height: '*',
        }),
      ),
      state(
        'closed',
        style({
          height: '0px',
        }),
      ),
      transition('open <=> closed', [animate('100ms ease-in-out')]),
    ])
  ]
})

export class SidebarComponent {
  public WorkspaceType = WorkspaceType;
  public animationTime = 100;
  public expandedWorkspaces: Set<number> = new Set<number>();
  public renderedWorkspaces: Set<number> = new Set<number>();
  public openWorkspaceId: number = 0; 

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
        contents: "konenti"
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
      name: 'Directory 3',
      type: WorkspaceType.Directory,
      ownerId: 1,
      parentId: 5,
    },
    {
      id: 7,
      name: 'Directory 4',
      type: WorkspaceType.Directory,
      ownerId: 1,
      parentId: 6,
    },
    {
      id: 8,
      name: 'Document 3',
      type: WorkspaceType.Document,
      ownerId: 1,
      parentId: 7,
      contents: "tajni kontent ovog dokumenta"
    },
    {
      id: 9,
      name: 'New Workspace (1)',
      type: WorkspaceType.Workspace,
      ownerId: 1,
      parentId: null,
  },
  ];

  /** Workspace nad kojim korisnik nema WorkspaceRetrieval UseCase treba da bude potpuno skriven korisniku. 
   * Ovo ce se omoguciti tako sto ce ovaj Workspace biti inicijalizovan na osnovu podataka iz JSON fajla i ucitan u memoriju
   * tek kada se prethodno dohvate podaci o razlicitim UseCasevima koje trenutni korisnik ima nad razlicitim Workspace-evima.
   * Ovakav pristup ce simulirati kako bi to radilo sa pravimo podacima koji bi pristizali sa backenda. (za ispitni projekat)"
   */

  public userWorkspaceUseCases: WorkspaceUseCasesDto[] = [
    new WorkspaceUseCasesDto(1, [UseCase.WorkspaceRetrieval, UseCase.WorkspaceCreation]),
    new WorkspaceUseCasesDto(2, [UseCase.WorkspaceRetrieval, UseCase.WorkspaceDeletion]),
    new WorkspaceUseCasesDto(3, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(4, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(5, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(6, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(7, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(8, [UseCase.WorkspaceRetrieval]),
    new WorkspaceUseCasesDto(9, [UseCase.WorkspaceRetrieval]),
  ];

  public constructor(private workspaceService: WorkspaceService) {}

  public toggleWorkspace(workspace: Workspace): void {

    if (workspace.type !== WorkspaceType.Document) {
      if (this.expandedWorkspaces.has(workspace.id)) {
        this.expandedWorkspaces.delete(workspace.id);
        setTimeout(() => this.renderedWorkspaces.delete(workspace.id), this.animationTime);
      } 
      else {
        this.expandedWorkspaces.add(workspace.id);
        this.renderedWorkspaces.add(workspace.id);
      }
    } 
    else {
      this.isOpen(workspace.id) ? this.closeDocument() : this.openDocument(workspace)
    }
  }

  public shouldRender(id: number): boolean {
    return this.renderedWorkspaces.has(id);
  }

  public isExpanded(id: number): boolean {
    return this.expandedWorkspaces.has(id);
  }

  public isOpen(workspaceId: number): boolean {
    return this.openWorkspaceId === workspaceId;
  }

  public openDocument(workspace: Workspace): void {
    if (workspace.contents === undefined) {
      workspace.contents = null;
    }

    this.workspaceService.setContent(workspace.name, workspace.contents);
    this.openWorkspaceId = workspace.id;
  }

  public closeDocument(): void {
    this.workspaceService.setContent(null);
    this.openWorkspaceId = 0;
  }

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
}
