import { Routes } from '@angular/router';
import { WorkspaceCreateComponent } from './workspace-create/workspace-create.component'; 
import { ContentComponent } from './layout/content/content.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: ContentComponent }, 
  { path: 'create/:parentId', component: WorkspaceCreateComponent }, 
];