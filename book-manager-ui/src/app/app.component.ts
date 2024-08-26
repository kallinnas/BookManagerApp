import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GeneralModule } from './modules/general.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, GeneralModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-manager-ui';
}
