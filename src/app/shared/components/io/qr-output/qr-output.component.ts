import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
declare var Instascan: any;

@Component({
  selector: 'app-qr-output',
  templateUrl: './qr-output.component.html',
  styleUrls: ['./qr-output.component.css']
})
export class QrOutputComponent implements OnInit {

  @Input() dataString
  @Output() close: EventEmitter<any>= new EventEmitter<any>();
  @Output() dataOutput: EventEmitter<any>= new EventEmitter<any>();

  nodata="/assets/img/Logo.svg"

  img=this.nodata;
  
  scanner:any;
  cameras:any[]=[];
  indexCam = 0;

  constructor() { 
    
  } 

  Close(){
    this.close.emit("close");
  }

  OnChanges(){
    
  }
  ngOnInit(): void {
    this.scanner=new Instascan.Scanner({ video: document.getElementById('preview') })
      this.scanner.addListener('scan', (content) => {
        let object = null
        try {
           object = JSON.parse(atob(content))
        } catch (error) {
          console.log("wrong object");
          this.scanner.stop();
          Swal.fire({
            icon: 'error',
            title: 'Objeto incorrecto',
            text: `No se encontro informacion valida`
          }).then(()=>{this.scanner.start(this.cameras[this.indexCam])})
        }
        if(object!=null){
           this.dataOutput.emit(object);
        }
       
      });
      Instascan.Camera.getCameras().then((cams)=>{
        this.cameras=cams
        if (this.cameras.length > 0) {
          this.scanner.start(this.cameras[0]); 
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
  }

  changeCam(){
    this.scanner.stop().then(f => {
      this.scanner.start(this.cameras[this.nextCam()]);
  })
  }

  nextCam() {
      let len = this.cameras.length;
      console.log(len-1);
      console.log(this.indexCam);
      console.log(((len - 1) == this.indexCam))
      if ((len - 1) == this.indexCam) {
          this.indexCam=0
          return 0;
      } else {
          this.indexCam++;
          return this.indexCam;
      }
      
  }

  ngOnDestroy(){
    this.scanner.stop();
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
