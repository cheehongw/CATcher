import { Injectable } from '@angular/core';
import { ThemeStorage } from './theme-storage/theme-storage';

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable({
  providedIn: 'root'
})
export class StyleManager {
  isDark = false;

  constructor(private _themeStorage: ThemeStorage | null) {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme === 'dark-mode') {
      this.setDarkTheme();
      this.isDark = true;
    }
  }

  setDarkTheme() {
    document.body.classList.toggle('dark-mode');
    this._themeStorage.storeTheme('dark-mode');
    this.isDark = true;
  }

  setDefaultTheme() {
    document.body.classList.remove('dark-mode');
    this._themeStorage.clearStorage();
    this.isDark = false;
  }
}
