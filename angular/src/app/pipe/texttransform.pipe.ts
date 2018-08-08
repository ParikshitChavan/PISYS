import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'texttransform'
})
export class TexttransformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value){
      return
    }

    var responsibilities = value.split('\n');
    value = responsibilities.filter(data => data !== '');
       
    return value;
  }

}
