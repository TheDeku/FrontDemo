import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { QRCode, ErrorCorrectLevel, QRNumber, QRAlphaNum, QR8BitByte, QRKanji } from 'qrcode-generator-ts/js';

@Component({
  selector: 'app-qr-input',
  templateUrl: './qr-input.component.html',
  styleUrls: ['./qr-input.component.css']
})
export class QrInputComponent implements OnInit {

  @Input() dataString
  @Output() close: EventEmitter<any>= new EventEmitter<any>();

  qrCode= new QRCode();

  nodata="/assets/img/Logo.svg"

  img=this.nodata;
  
    constructor(
    ) { 
      this.qrCode.setErrorCorrectLevel(ErrorCorrectLevel.M);
      this.qrCode.setTypeNumber(4);
    }
  
  Close(){
    this.close.emit("close");
  }

  OnChanges(){
    this.setvalue(this.dataString)
  }
  ngOnInit(): void {
    this.setvalue(this.dataString)
  }

  public setvalue(value){
    if (value==null){
      this.img = this.nodata;
    }else{
      console.log(value)
      this.qrCode.addData(value);
      this.qrCode.make();
      this.img = this.qrCode.toDataURL();
    }
  }


  headeron(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
   ev.target.classList.add("move")
  }

  headeroff(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.classList.remove("move")
  }

  headermove(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.target.classList.contains("move")){
      let window = ev.target.parentElement;

      let left = window.offsetLeft + ev.movementX;
      let top = window.offsetTop + ev.movementY;

      top =(top>0)?top:0;

      window.style.left = left+"px" ;
      window.style.top = top+"px";
      
    }
  }

  frameon(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.classList.add("resize")
  }

  frameoff(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.classList.remove("resize")
  }

  framemove(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.target.classList.contains("resize")){

      let dirs=[
        {cod:"T", position:"top"    ,offset:"offsetTop"  ,repos:true , axis:"Y" ,prop:"offsetHeight" ,factor:-1},
        {cod:"B", position:"bottom" ,offset:"offsetBottom",repos:false, axis:"Y" ,prop:"offsetHeight" ,factor:1},
        {cod:"L", position:"left"   ,offset:"offsetLeft"  ,repos:true , axis:"X" ,prop:"offsetWidth"  ,factor:-1},
        {cod:"R", position:"right"  ,offset:"offsetRight" ,repos:false, axis:"X" ,prop:"offsetWidth"  ,factor:1}
      ];
      let dir;
      for (const d of dirs) {
        if(ev.target.classList.contains(d.cod))dir=d;
      }

      let window = ev.target.parentElement;

      let pos = window[dir.offset] + ev["movement"+dir.axis];

      let dif = parseInt(window.style.getPropertyValue("--qrwh").replace("px","")) + ev["movement"+dir.axis] * dir.factor;

      window.style.setProperty("--qrwh", dif+"px");

      console.log(window.style.getPropertyValue("--qrwh"));

      if(dir.repos){
        window.style[dir.position] = pos+"px" ;
      }
    }
  }

  corneron(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.classList.add("resize")
  }

  corneroff(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
    ev.target.classList.remove("resize")
  }

  cornermove(ev,it){
    ev.preventDefault();
    ev.stopPropagation();
    if(ev.target.classList.contains("resize")){

      let dirs=[
        {cod:"TL", positionX:"top"   , positionY:"left"   ,offsetX:"offsetTop"   ,offsetY:"offsetLeft"  ,reposX:true ,reposY:true  ,factorX:-1,factorY:-1},
        {cod:"TR", positionX:"top"   , positionY:"right"  ,offsetX:"offsetTop"   ,offsetY:"offsetRight" ,reposX:true ,reposY:false ,factorX:1,factorY:-1},
        {cod:"BL", positionX:"bottom", positionY:"left"   ,offsetX:"offsetBottom",offsetY:"offsetLeft"  ,reposX:false,reposY:true  ,factorX:-1,factorY:1},
        {cod:"BR", positionX:"bottom", positionY:"right"  ,offsetX:"offsetBottom",offsetY:"offsetRight" ,reposX:false,reposY:false ,factorX:1,factorY:1}
      ];
      let dir;
      for (const d of dirs) {
        if(ev.target.classList.contains(d.cod))dir=d;
      }

      let window = ev.target.parentElement;

      let posx = window[dir.offsetX] + ev.movementX *dir.factorX*dir.factorY;
      let posy = window[dir.offsetY] + ev.movementY *dir.factorX*dir.factorY;

      let difx = parseInt(window.style.getPropertyValue("--qrwh").replace("px","")) + ev.movementX * dir.factorX;
      let dify = parseInt(window.style.getPropertyValue("--qrwh").replace("px","")) + ev.movementY * dir.factorY;

      let dif=difx;
      if(Math.abs(ev.movementX)>Math.abs(ev.movementY)){
        dif=dify
      }

      window.style.setProperty("--qrwh", dif+"px");

      if(dir.reposX){
        window.style[dir.positionX] = posx+"px" ;
      }
      if(dir.reposY){
        window.style[dir.positionY] = posy+"px" ;
      }
    }
  }


}
