import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = signal(false);

  public get isDarkMode() : boolean {
    return this.darkMode()
  }

  public set setDarkMode(v : boolean) {
    if (v) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    this.darkMode.set(v);
  }
}
