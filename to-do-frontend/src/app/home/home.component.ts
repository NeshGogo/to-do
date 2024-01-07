import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ThemeToggleComponent],
  template: `
    <app-theme-toggle></app-theme-toggle>
    <h1 class="primary-title text-center">My Tasks</h1>
  `,
})
export class HomeComponent {}
