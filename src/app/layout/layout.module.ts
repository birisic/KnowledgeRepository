import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ContentComponent
  ]
})
export class LayoutModule { }
