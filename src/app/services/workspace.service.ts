import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocumentDto } from '../dto/document.dto';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private currentWorkspaceSubject = new BehaviorSubject<DocumentDto | null>(null);

  public currentWorkspace$ = this.currentWorkspaceSubject.asObservable();

  public setContent(name:string | null, contents: string | null = null): void {
    let dto: DocumentDto | null = null;
    if (name !== null) {
      dto = new DocumentDto(name, contents)
    }

    this.currentWorkspaceSubject.next(dto);
  }
}
