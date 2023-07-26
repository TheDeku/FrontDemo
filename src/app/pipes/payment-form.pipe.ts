import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'typepayment'
})
export class TypePaymentPipe implements PipeTransform {

    transform(value: any): any {
        switch (value) {
            case "EFE":
                return "Efectivo"
                break;
            case "TAR":
                return "Tarjeta"
                break;
            default:
                break;
        }

    }

}
