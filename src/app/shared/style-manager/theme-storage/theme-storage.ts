import { EventEmitter, Injectable } from '@angular/core';

export interface SiteTheme {
  href: string;
  accent: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
}

@Injectable()
export class ThemeStorage {
  static storageKey = 'theme-storage-current';

  public onThemeUpdate: EventEmitter<SiteTheme> = new EventEmitter<SiteTheme>();

  public storeTheme(theme: SiteTheme) {
    try {
      window.localStorage[ThemeStorage.storageKey] = JSON.stringify(theme);
    } catch (e) {
      console.log('unable to store theme');
      console.log(e);
    }

    this.onThemeUpdate.emit(theme);
  }

  public getStoredTheme(): SiteTheme | null {
    try {
      return JSON.parse(window.localStorage[ThemeStorage.storageKey] || null);
    } catch (e) {
      return null;
    }
  }

  public clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorage.storageKey);
    } catch (e) {
      console.log('unable to clear storage');
      console.log(e);
    }
  }
}
