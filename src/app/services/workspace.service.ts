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
  private dataPath = 'assets/data/workspaces.json';

  private constructor(private http: HttpClient) {}

  public setContent(name:string | null, contents: string | null = null): void {
    let dto: DocumentDto | null = null;
    
    if (name !== null) {
      dto = new DocumentDto(name, contents)
    }

    this.currentWorkspaceSubject.next(dto);
  }

  public getWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(this.dataPath);
  }
}
