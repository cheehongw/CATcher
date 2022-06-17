import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { SiteTheme, ThemeStorage } from './theme-storage/theme-storage';

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable({
  providedIn: 'root'
})
export class StyleManager {
  currentTheme: SiteTheme | undefined;

  themes = [
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      href: 'indigo-pink.css',
      isDark: false,
      isDefault: true
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      href: 'pink-bluegrey.css',
      isDark: true
    }
  ];

  constructor(private _themeStorage: ThemeStorage | null) {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    } else {
      this.themes.find((theme) => {
        if (theme.isDefault === true) {
          this.installTheme(theme);
        }
      });
    }
  }

  installTheme(theme: SiteTheme) {
    this.currentTheme = this._getCurrentThemeFromHref(theme.href);

    if (theme.isDefault) {
      this.removeStyle('theme');
    } else {
      this.setStyle('theme', `assets/themes/${theme.href}`);
    }

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

  onToggle(event: MatSlideToggleChange) {
    const isDark: boolean = event.checked;
    if (isDark) {
      this.installTheme(this.themes[1]);
    } else {
      this.installTheme(this.themes[0]);
    }
  }

  /**
   * Set the stylesheet with the specified key.
   */
  setStyle(key: string, href: string) {
    getLinkElementForKey(key).setAttribute('href', href);
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  private _getCurrentThemeFromHref(href: string): SiteTheme {
    return this.themes.find((theme) => theme.href === href);
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
