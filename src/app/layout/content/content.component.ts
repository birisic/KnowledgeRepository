import { Component } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { DocumentDto } from '../../dto/document.dto';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})

export class ContentComponent {
  public document: DocumentDto | null = null;

  public constructor(private workspaceService: WorkspaceService) {}

  ngOnInit(): void {
    this.workspaceService.currentWorkspace$.subscribe(dto => {            
      this.document = dto;
    });
  }
}
