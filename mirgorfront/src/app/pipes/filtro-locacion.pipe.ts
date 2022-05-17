import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLocacion'
})
export class FiltroLocacionPipe implements PipeTransform {

  transform(value:any, arg: any): any {
   return "golalsldasd";
  }

}
