import { Component } from '@angular/core';
import { Workspace } from '../interfaces/workspace.interface';
import { AuthService } from '../services/auth.service';
import { WorkspaceUseCasesDto } from '../dto/workspace-use-cases.dto';
import { WorkspaceType } from '../enums/workspace-type.enum';
import { UseCase } from '../enums/use-case.enum';
import { WorkspaceService } from '../services/workspace.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { ToastService } from '../services/toast.service';
import { ToastStatus } from '../enums/toast-status.enum';
import { HttpResponse } from '@angular/common/http';
import { WorkspaceDto } from '../dto/workspace.dto';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ConfirmationDialogComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  public isVisible: boolean = false;
  public positionX: number = 0;
  public positionY: number = 0;
  public selectedWorkspace: Workspace | null = null;
  public userWorkspacesUseCases: WorkspaceUseCasesDto[] = [];
  public WorkspaceType = WorkspaceType;
  public UseCase = UseCase;
  public showConfirmationDialog: boolean = false;

  public constructor(
    authService: AuthService,
    private workspaceService: WorkspaceService,
    private toastService: ToastService
  ) {
    this.userWorkspacesUseCases = authService.getUserWorkspacesUseCases();
  }

  public ngOnInit(): void {
    document.addEventListener('click', () => this.hideMenu());
  }

  public showMenu(event: MouseEvent, workspace: Workspace): void {
    event.preventDefault();
    this.isVisible = true;
    this.positionX = event.clientX;
    this.positionY = event.clientY;
    this.selectedWorkspace = workspace;        
  }

  public hideMenu(): void {
    this.isVisible = false;
  }

  public onAction(useCase: UseCase): void {
    switch (useCase) {
      case UseCase.WorkspaceCreation:
        if (this.selectedWorkspace) {
          this.workspaceService.routeToCreatePage(this.selectedWorkspace.id);
        }
        
        break;

      case UseCase.WorkspaceModification:
        if (this.selectedWorkspace) {
          this.workspaceService.routeToEditPage(this.selectedWorkspace.id); // Pass selected workspace id
        }       
         
        break;

      case UseCase.WorkspaceDeletion:
        this.showConfirmationDialog = true;
        break;

      default:
        break;
    }
    
    this.hideMenu();
  }

  public hasUseCase(useCase: UseCase): boolean | null {  
    return this.selectedWorkspace && this.userWorkspacesUseCases?.some(dto =>
      dto.workspaceId === this.selectedWorkspace?.id && dto.useCases.includes(useCase)
    );
  }

  public confirmDeletion(): void {
    if (this.selectedWorkspace) {
      const childWorkspaces = this.workspaceService.getChildWorkspaces(this.selectedWorkspace);

    if (childWorkspaces.length > 0) {
      this.toastService.show("Cannot delete the workspace because it has child workspaces.", ToastStatus.Warning);
      this.showConfirmationDialog = false; 

      return; 
    }

    const workspaceDto: WorkspaceDto = {
      id: this.selectedWorkspace.id, 
      name: this.selectedWorkspace.name,
      type: this.selectedWorkspace.type,
      contents: this.selectedWorkspace.contents ?? '',
      parentId: this.selectedWorkspace.parentId
  };

    this.workspaceService.deleteWorkspace(workspaceDto).subscribe({
      next: (response: HttpResponse<void>) => {
          this.workspaceService.refreshWorkspaces();
          this.workspaceService.setContent(); 
          this.toastService.show(this.selectedWorkspace?.type + ` "${this.selectedWorkspace?.name}"` + " was successfully deleted.", ToastStatus.Success);
      },
      error: (error) => {
          this.toastService.show("Failed to delete workspace. Please try again.", ToastStatus.Danger);
          console.error('Error deleting workspace.');
          console.error(error);
      }
  });
    }

    this.showConfirmationDialog = false; 
  }

  public cancelDeletion(): void {
    this.showConfirmationDialog = false;
  }
}
