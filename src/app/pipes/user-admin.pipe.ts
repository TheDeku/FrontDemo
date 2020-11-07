import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserEmpyPipe implements PipeTransform {

  transform(value:any): any {
    if (value!=undefined) {
      return value
    }else{
      return "No Informado";
    }

  }

}
