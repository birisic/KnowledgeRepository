import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private currentContentSubject = new BehaviorSubject<string | null>(null);
  public currentContent$ = this.currentContentSubject.asObservable();

  public setContent(content: string | null): void {
    this.currentContentSubject.next(content);
  }
}
