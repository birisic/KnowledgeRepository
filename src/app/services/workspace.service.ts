import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentDto } from '../dto/document.dto';
import { HttpClient } from '@angular/common/http';
import { Workspace } from '../interfaces/workspace.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService 
{
  private currentWorkspaceSubject = new BehaviorSubject<DocumentDto | null>(null);
  public currentWorkspace$ = this.currentWorkspaceSubject.asObservable();
  private workspacesSubject = new BehaviorSubject<Workspace[]>([]);
  public workspaces$ = this.workspacesSubject.asObservable();
  private dataPath = 'assets/data/workspaces.json';

  private constructor(private http: HttpClient) {}

  public setContent(name:string | null = null, contents: string | null = null): void {
    let dto: DocumentDto | null = null;
    
    if (name !== null) {
      dto = new DocumentDto(name, contents)
    }

    this.currentWorkspaceSubject.next(dto);
  }

  public getWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(this.dataPath);
  }

  public initializeWorkspaces(): void {
    this.getWorkspaces().subscribe((data: Workspace[]) => {
      this.workspacesSubject.next(data);
    });
  }

  public deleteWorkspace(workspace: Workspace) {
    const currentWorkspaces = this.workspacesSubject.getValue();
    const updatedWorkspaces = currentWorkspaces.filter(w => w.id !== workspace.id);
    this.workspacesSubject.next(updatedWorkspaces);
    this.setContent();
  }
}
