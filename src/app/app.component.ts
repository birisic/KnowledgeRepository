import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LayoutModule} from "./layout/layout.module";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.scss', './app.component.scss']
})
export class AppComponent {
  title = 'KnowledgeRepository';
}
