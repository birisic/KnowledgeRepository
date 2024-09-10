import { Component } from '@angular/core';
import { Workspace } from '../interfaces/workspace.interface';
import { AuthService } from '../services/auth.service';
import { WorkspaceUseCasesDto } from '../dto/workspace-use-cases.dto';
import { WorkspaceType } from '../enums/workspace-type.enum';
import { UseCase } from '../enums/use-case.enum';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
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

  public constructor(
    authService: AuthService
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

  public onAction(action: string): void {
    // check if the user has the appropriate UseCase for the selected Workspace
    // if so, and if it's delete, call the service method and remove the Workspace from memory
    // if it's edit, call the service method which routes the user to the Edit page (if you edit names, make sure to have a counter)
    // if it's create, call the service method which routes the user to the Create page
  
    this.hideMenu();
  }

  public hasUseCase(useCase: UseCase): boolean | null {  
    console.log(this.selectedWorkspace && this.userWorkspacesUseCases?.some(dto =>
      dto.workspaceId === this.selectedWorkspace?.id && dto.useCases.includes(useCase)));
      
    return this.selectedWorkspace && this.userWorkspacesUseCases?.some(dto =>
      dto.workspaceId === this.selectedWorkspace?.id && dto.useCases.includes(useCase)
    );
  }
}
