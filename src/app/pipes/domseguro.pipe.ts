import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private domsanitizer:DomSanitizer){

  }

  transform(url: string): any {
    return this.domsanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
