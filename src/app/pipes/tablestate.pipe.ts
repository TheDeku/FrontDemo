import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablestate'
})
export class PipeTableState implements PipeTransform {

  transform(type: any): string {

    switch (type) {
      case 1:
        return "Reservada"
        break;
      case 2:
        return "Disponible"
        break;
      case 3:
        return "En Uso"
        break;

      default:
        return "Sin Catalogar"
        break;
    }


  }

}
