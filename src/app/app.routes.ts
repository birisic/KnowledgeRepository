import { Routes } from '@angular/router';
import { WorkspaceCreateComponent } from './workspace-create/workspace-create.component'; 

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'create', component: WorkspaceCreateComponent }, 
];