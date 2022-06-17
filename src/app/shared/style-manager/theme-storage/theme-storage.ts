import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ThemeStorage {
  static storageKey = 'theme-storage-current';

  public onThemeUpdate: EventEmitter<string> = new EventEmitter<string>();

  public storeTheme(theme: string) {
    try {
      window.localStorage[ThemeStorage.storageKey] = theme;
    } catch (e) {
      console.log('unable to store theme');
      console.log(e);
    }

    this.onThemeUpdate.emit(theme);
  }

  public getStoredTheme(): string | null {
    try {
      return window.localStorage[ThemeStorage.storageKey] || null;
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
