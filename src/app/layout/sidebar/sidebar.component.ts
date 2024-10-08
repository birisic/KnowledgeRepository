import { Component, ViewChild } from '@angular/core';
import { Workspace } from '../../interfaces/workspace.interface';
import { WorkspaceType } from '../../enums/workspace-type.enum';
import { UseCase } from '../../enums/use-case.enum';
import { WorkspaceUseCasesDto } from '../../dto/workspace-use-cases.dto';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { WorkspaceService } from '../../services/workspace.service';
import { MenuComponent } from '../../menu/menu.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  @ViewChild(MenuComponent) menuComponent!: MenuComponent;

  public WorkspaceType = WorkspaceType;
  public animationTime = 100;
  public expandedWorkspaces: Set<number> = new Set<number>();
  public renderedWorkspaces: Set<number> = new Set<number>();
  public openWorkspaceId: number = 0; 
  public workspaces: Workspace[] = [];
  public userWorkspacesUseCases: WorkspaceUseCasesDto[] = [];

  public constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    authService: AuthService
  ) {
    this.userWorkspacesUseCases = authService.getUserWorkspacesUseCases();
  }

  public ngOnInit(): void {
    this.fetchWorkspaces();
  }

  public fetchWorkspaces(): void {
    this.workspaceService.workspaces$.subscribe((data: Workspace[]) => {      
      this.workspaces = data.map(workspace => {
        return {
          ...workspace,
          type: WorkspaceType[workspace.type as keyof typeof WorkspaceType]
        };
      });
    });

    if (this.workspaces.length === 0) {
      this.workspaceService.initializeWorkspaces();
    }
  }

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

    this.router.navigate(['/']);
  }

  public closeDocument(): void {
    this.workspaceService.setContent(null);
    this.openWorkspaceId = 0;
  }

  public hasUseCase(workspaceId: number, useCase: UseCase): boolean {
    const userWorkspace = this.userWorkspacesUseCases.find(wu => wu.workspaceId === workspaceId);
    return userWorkspace ? userWorkspace.useCases.includes(useCase) : false;
  }

  public getRootWorkspaces(): Workspace[] {
    return this.workspaces.filter(workspace => !workspace.parentId);// && this.hasAccessToWorkspaceAndAncestors(workspace));
  }

  public getChildWorkspaces(parentWorkspace: Workspace): Workspace[] {  
    return this.workspaces.filter(workspace => parentWorkspace.type !== WorkspaceType.Document 
            && workspace.parentId === parentWorkspace.id); 
  }

  public onRightClick(event: MouseEvent, workspace: Workspace): void {
    if (this.menuComponent) {
      this.menuComponent.showMenu(event, workspace);
    }
    else {
      console.log("Menu component not yet initialized.");
    }
  }
}
