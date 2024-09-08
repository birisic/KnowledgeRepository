import { Component } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  public content: string | null = null;

  public constructor(private workspaceService: WorkspaceService) {}

  ngOnInit(): void {
    this.workspaceService.currentContent$.subscribe(content => {
      this.content = content;
    });
  }
}
