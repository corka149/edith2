import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  /**
   * dGetText - Get a translation from the domain.
   */
  public dGetText(domain: string, key: string): string  {
    return key;
  }

  /**
   * getText - Get translation without a domain.
   */
  public getText(key: string): string {
    return key;
  }
}
