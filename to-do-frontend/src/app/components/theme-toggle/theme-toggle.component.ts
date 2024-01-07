import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconModule, MatSlideToggleModule],
  template: `
    <div class="container">
      <div><mat-icon>nights_stay</mat-icon></div>
      <p class="">Dark Mode</p>
      <div>
        <mat-slide-toggle
          class="btn"
          (click)="toggleTheme()"
        ></mat-slide-toggle>
      </div>
    </div>
  `,
  styles: `
    .container{
      margin-top: 1rem;
      text-align: right;
      margin-top: 1rem;
      display: flex;
      align-content: center;
      justify-content: flex-end;
      align-items: center;
    }
    .btn {
      margin-left: 5px;
    }
    p{
      margin: 0;
    }
  `,
})
export class ThemeToggleComponent {
  isDarkMode = signal(false);

  constructor(private themeService: ThemeService) {
    this.isDarkMode.set(this.themeService.isDarkMode);
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    this.themeService.setDarkMode = this.isDarkMode();
  }
}
