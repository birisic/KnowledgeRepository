import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceService } from '../services/workspace.service';
import { ToastService } from '../services/toast.service';
import { Workspace } from '../interfaces/workspace.interface';
import { WorkspaceType } from '../enums/workspace-type.enum';
import { ToastStatus } from '../enums/toast-status.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-workspace-update',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule],
  templateUrl: './workspace-update.component.html',
  styleUrl: './workspace-update.component.css'
})

export class WorkspaceUpdateComponent {
  public workspaceId: number | null = null;
  public workspaceName: string = '';
  public workspaceContents: string = '';
  public workspaceType: WorkspaceType | null = null;
  public parentId: number | null = null;
  public Editor = ClassicEditor;

  public constructor(
    private workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.workspaceId = +params.get('id')!;
      this.fetchWorkspace();
    });
  }

  private fetchWorkspace(): void {
    this.workspaceService.workspaces$.subscribe(workspaces => {
      const workspace = workspaces.find(w => w.id === this.workspaceId);
      if (workspace) {
        if (typeof workspace.contents === "string") {
          this.workspaceContents = workspace.contents ;
        }

        if (workspace.parentId) {          
          this.parentId = workspace.parentId
        }

        this.workspaceName = workspace.name;
        this.workspaceType = workspace.type;
      }
      else {
        this.toastService.show("No Workspace found for the provided ID.", ToastStatus.Danger);
      }
    });
  }

  public updateWorkspace(): void {
    if (!this.workspaceName) {
      this.toastService.show("A Workspace must have a name.", ToastStatus.Danger);
      return;
    }

    const updatedWorkspace: Workspace = {
      id: this.workspaceId!,
      name: this.workspaceName,
      type: this.workspaceType!, //type should not change
      ownerId: 1, 
      contents: this.workspaceType === WorkspaceType.Document ? this.workspaceContents : '',
      parentId: this.parentId
    };
    

    const workspaces = this.workspaceService.workspacesSubject.getValue().map(w =>
      w.id === this.workspaceId ? updatedWorkspace : w
    );
    this.workspaceService.workspacesSubject.next(workspaces);

    if (updatedWorkspace.type === WorkspaceType.Document) {
      this.workspaceService.setContent(this.workspaceName, this.workspaceContents);
    } 

    this.router.navigate(['/']);
  }
}
