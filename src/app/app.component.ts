import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutModule } from "./layout/layout.module";
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutModule,
    FormsModule,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss', './app.component.scss']
})
export class AppComponent {
  title = 'KnowledgeRepository';
  public showLayout: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.updateLayoutVisibility();
    });
  }

  private updateLayoutVisibility(): void {
    const currentRoute = this.router.url;
    this.showLayout = currentRoute !== '/login' && currentRoute !== '/register';
  }
}
