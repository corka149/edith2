import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';
import { from, Observable } from 'rxjs';


@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private translationService: TranslationService
  ) {}

  transform(value: any, ...args: any[]): string {
    return this.getTranslation(value, args);
  }

  private getTranslation(key: string, args: string[]): string {
    return args.length === 0 ? this.translationService.getText(key) : this.translationService.dGetText(args[0], key);
  }
}
