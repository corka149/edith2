import { Injectable } from '@angular/core';
import { Translations } from './translation';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  /**
   * dGetText - Get a translation from the domain.
   */
  public dGetText(domain: string, key: string): string  {
    return Translations.findByDomain(domain, 'de', key);
  }

  /**
   * getText - Get translation without a domain.
   */
  public getText(key: string): string {
    return Translations.find('de', key);
  }
}
