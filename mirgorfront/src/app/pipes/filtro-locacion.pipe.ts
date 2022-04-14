import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroLocacion'
})
export class FiltroLocacionPipe implements PipeTransform {

  transform(value:any, arg: any): any {
    console.log(value);
    const resultado=[];
    for(const filtro of value){
      if(filtro.descripcion.indexOf(arg) > -1)
      {
        resultado.push(filtro)
      }
    }
  }

}
