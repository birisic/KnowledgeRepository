import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentDto } from '../dto/document.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Workspace } from '../interfaces/workspace.interface';
import { ToastStatus } from '../enums/toast-status.enum';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { WorkspaceDto } from '../dto/workspace.dto';

@Injectable({
  providedIn: 'root'
})

export class WorkspaceService 
{
  public currentWorkspaceSubject = new BehaviorSubject<DocumentDto | null>(null);
  public currentWorkspace$ = this.currentWorkspaceSubject.asObservable();
  public workspacesSubject = new BehaviorSubject<Workspace[]>([]);
  public workspaces$ = this.workspacesSubject.asObservable();
  private basePath = "http://localhost:5004/api/workspaces";
  private dataPath = `${this.basePath}/getAll`;

  private constructor(
    private http: HttpClient, 
    private toastService: ToastService, 
    private router: Router
  ) {}

  public refreshWorkspaces(): void {
    this.http.get<Workspace[]>(this.dataPath).subscribe({
      next: (workspaces) => {
        this.workspacesSubject.next(workspaces);
      },
      error: (error) => {
        console.error('Error refreshing workspaces.');
        console.error(error);
      }
    });
  }

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

  public deleteWorkspace(dto: WorkspaceDto): Observable<HttpResponse<void>> {
    return this.http.request<void>('DELETE', `${this.basePath}/${dto.id}`, {
        body: dto,
        observe: 'response'
    });
}

  public getChildWorkspaces(parentWorkspace: Workspace): Workspace[] {
    const currentWorkspaces = this.workspacesSubject.getValue();
    return currentWorkspaces.filter(workspace => workspace.parentId === parentWorkspace.id);
  }

  public routeToCreatePage(parentId: number): void {
      this.router.navigate(['/create', parentId]);
  }

  public routeToEditPage(workspaceId: number): void {
    this.router.navigate(['/edit/', workspaceId]);
  }

  public createWorkspace(workspace: WorkspaceDto): Observable<HttpResponse<void>> {
    return this.http.post<HttpResponse<void>>(this.basePath, workspace);
  }

  public updateWorkspace(workspace: WorkspaceDto): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(`${this.basePath}/${workspace.id}`, workspace);
}
}
