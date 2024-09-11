import { Component } from '@angular/core';
import { Workspace } from '../interfaces/workspace.interface';
import { AuthService } from '../services/auth.service';
import { WorkspaceUseCasesDto } from '../dto/workspace-use-cases.dto';
import { WorkspaceType } from '../enums/workspace-type.enum';
import { UseCase } from '../enums/use-case.enum';
import { WorkspaceService } from '../services/workspace.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

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
    private workspaceService: WorkspaceService
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

      // case UseCase.WorkspaceModification:
      //   this.workspaceService.routeToEditPage();
      //   break;

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
      this.workspaceService.deleteWorkspace(this.selectedWorkspace);
    }

    this.showConfirmationDialog = false; 
  }

  public cancelDeletion(): void {
    this.showConfirmationDialog = false;
  }
}
