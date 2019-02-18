import { Pipe, PipeTransform } from '@angular/core';
import { GetLocaleService } from '../services/getLocale/get-locale.service';

@Pipe({
  name: 'localeTransform',
  pure: false
})
export class LocaleTransformPipe implements PipeTransform {

  constructor(private getLocale: GetLocaleService) {}

  transform(key: any): any {
    return this.getLocale.currStr[key];
  }

}
