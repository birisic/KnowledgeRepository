import { Routes } from '@angular/router';
import { WorkspaceCreateComponent } from './workspace-create/workspace-create.component'; 
import { ContentComponent } from './layout/content/content.component';
import { WorkspaceUpdateComponent } from './workspace-update/workspace-update.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: ContentComponent, canActivate: [AuthGuard] }, 
  { path: 'create/:parentId', component: WorkspaceCreateComponent, canActivate: [AuthGuard] }, 
  { path: 'edit/:id', component: WorkspaceUpdateComponent, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [AuthGuard] },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule), canActivate: [AuthGuard] },
];