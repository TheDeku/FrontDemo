import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'empyImage'
})
export class EmpyImagePipe implements PipeTransform {

  constructor(){}

  async transform(value:any){
  let values = await this.testImage(value,5000).then(resp=>{
      console.log(resp);
      console.log(value);
      return value;
    }).catch(err=>{
      console.log(err);
      return "./../../assets/icons/finanzas.svg"
    })
    console.log(values);
    return values;


  }

  testImage(url, timeoutT) {
    return new Promise(function (resolve, reject) {
        var timeout = timeoutT || 5000;
        var timer, img = new Image();
        img.onerror = img.onabort = function () {
            clearTimeout(timer);
            reject("error");
        };
        img.onload = function () {
            clearTimeout(timer);
            resolve("success");
        };
        timer = setTimeout(function () {
            // reset .src to invalid URL so it stops previous
            // loading, but doesn't trigger new load
            img.src = "//!!!!/test.jpg";
            reject("timeout");
        }, timeout);
        img.src = url;
    });
}

}
