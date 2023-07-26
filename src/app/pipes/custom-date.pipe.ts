import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'CustomDatePipe'
})
export class CustomDatePipe implements PipeTransform {

    transform(value: any): any {
       return value.split("T")[0];
    }

}
