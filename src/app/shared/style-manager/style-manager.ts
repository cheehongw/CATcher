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
  currentTheme: string | undefined;

  constructor(private _themeStorage: ThemeStorage | null) {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme !== null) {
      this.installTheme(currentTheme);
    } else {
      this.installTheme('theme1.css');
    }
  }

  installTheme(cssFile: string) {
    const headEl = document.getElementsByTagName('head')[0];
    const newLinkEl = document.createElement('link');
    newLinkEl.rel = 'stylesheet';
    newLinkEl.href = cssFile;
    headEl.appendChild(newLinkEl);
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
