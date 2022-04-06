import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLocacion'
})
export class FiltroLocacionPipe implements PipeTransform {

  transform(value:any, arg: any): any {
    const resultado=[];
    for(const filtro of value){
      if(filtro.modelo.indexOf(arg) > -1)
      {
        console.log("si")
      }
    }
  }

}
