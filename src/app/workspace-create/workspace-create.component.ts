import { Component } from '@angular/core';
import { WorkspaceType } from '../enums/workspace-type.enum';
import { WorkspaceService } from '../services/workspace.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workspace } from '../interfaces/workspace.interface';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastService } from '../services/toast.service';
import { ToastStatus } from '../enums/toast-status.enum';
import { AuthService } from '../services/auth.service';
import { UseCase } from '../enums/use-case.enum';
import { WorkspaceUseCasesDto } from '../dto/workspace-use-cases.dto';

@Component({
  selector: 'app-workspace-create',
  standalone: true,
  imports: [CKEditorModule, CommonModule, FormsModule],
  templateUrl: './workspace-create.component.html',
  styleUrl: './workspace-create.component.css'
})

export class WorkspaceCreateComponent {
  public workspaceName: string = '';
  public workspaceContents: string = '';
  public workspaceType: WorkspaceType | null = null;
  public workspaceTypes = Object.values(WorkspaceType).filter(type => type !== WorkspaceType.Workspace);
  public Editor = ClassicEditor;
  public parentId: number | null = null;
  public parentWorkspace: Workspace | null = null;


  public constructor(
    private workspaceService: WorkspaceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const parentIdParam = params.get('parentId');  
      this.parentId = parentIdParam ? +parentIdParam : null;
  
      if (this.parentId) {
        this.fetchParentWorkspace();
      } else {
        this.parentWorkspace = null;
      }
    });
  }
  
  private fetchParentWorkspace(): void {
    this.workspaceService.workspaces$.subscribe(workspaces => {
      this.parentWorkspace = workspaces.find(workspace => workspace.id === this.parentId) || null;
    });
  }

  public createWorkspace(): void {
    if (!this.workspaceName) {
      this.toastService.show("A Workspace must have a name.", ToastStatus.Danger);
      return;
    }

    if (!this.workspaceType) {
      this.toastService.show("A Workspace must have a type.", ToastStatus.Danger);
      return; 
    }

    let useCases: UseCase[] = [];
    if (this.workspaceType === WorkspaceType.Directory) {
        useCases = [UseCase.WorkspaceCreation, UseCase.WorkspaceModification, UseCase.WorkspaceDeletion];
    } 
    else if (this.workspaceType === WorkspaceType.Document) {
        useCases = [UseCase.WorkspaceModification, UseCase.WorkspaceDeletion];
    }

    const newWorkspace: Workspace = {
      id: Date.now(), 
      name: this.workspaceName,
      type: this.workspaceType,
      ownerId: 1,
      contents: this.workspaceContents,
      parentId: this.parentId
    };

    this.workspaceService.workspacesSubject.next([...this.workspaceService.workspacesSubject.getValue(), newWorkspace]);

    const workspaceUseCaseDto = new WorkspaceUseCasesDto(newWorkspace.id, useCases);
    this.authService.userWorkspacesUseCases.push(workspaceUseCaseDto);

    if (newWorkspace.type === WorkspaceType.Document) {
      this.workspaceService.setContent(this.workspaceName, this.workspaceContents);
    } 

    this.router.navigate(['/']);
  }
}
