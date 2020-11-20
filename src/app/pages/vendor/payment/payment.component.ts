import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VendorService } from '../services/vender.service';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  isDisabled0 = false;
  isDisabled1 = true;
  isDisabled2 = true;
  openCamera = false;
  step = 0;
  order;
  totalAmount:number=0;
  tables;
  costototal: number;
  searchOrder = false;
  voucher={
    id:0
  };
  payments = [
    {
      nombre: "Efectivo",
      icon: "attach_money",
      code: "EFE"
    },
    {
      nombre: "Tarjeta",
      icon: "credit_card",
      code: "TAR"
    },
  ]

  filters = [
    {
      id: 2,
      nombre: "Mesa",
    },
    {
      id: 1,
      nombre: "Correo",
    },
  ]
  filtersConfig = { mail: false, table: false ,tableId:0}

  infoToPay = {
    boleta: {
      estado: "PEN",
      mesaId: 0,
      gruMesId: 1
    },
    pago: {
      formaPago: "",
      propina: 0
    },
    usuarioId: 0,
    estadoId: 5
  }
  paymentSelect: string;
  formFinder = new FormGroup({
    mail: new FormControl("", [Validators.required,Validators.email]),
    propina: new FormControl("", [Validators.required])
  })

  

  selectedPayment = false;
  constructor(private _vendorService: VendorService) { }

  async ngOnInit(): Promise<void> {
    await this._vendorService.getTables().then(resp=>{
      this.tables = resp;
      console.log(resp);
    })
  }

  onOpenCamera(){
    this.openCamera = true;
    console.log(this.openCamera);
  }

  async onQrOutput(event){
  
    if (event.hasOwnProperty('usuarioId')) {
        let type = "user"
        console.log(event);
        this.openCamera = false;
        
        let filters={
          usuarioId:event.usuarioId,
          pedidoeId:5
        }
    
        console.log(filters);
        console.log(type);
    
        await this._vendorService.findOrderByUserOrTable(type,filters).then(resp => {
          this.order = resp;
          if (this.order.length<=0) {
            this.searchOrder = false;
            return Swal.fire({
              icon: 'warning',
              title: 'No se encontro ninguna orden',
              text: `Intente nuevamente`
            });
          }else{
            this.searchOrder = true;
            console.log(resp);
            this.onTotalAmount();
          }
    
        })
      
    }else{

    }

  }

  async findOrder() {
    this.totalAmount = 0;
    let userID:number=0;
    let type;
 
    if (this.filtersConfig.mail) {
      type = "user";
      
      await this._vendorService.getUserMyMail(this.formFinder.value.mail).then(resp=>{
        userID = resp["id"];
      })
      console.log(userID);
    }else if (this.filtersConfig.table) {
      type = "table";
    }


    let filters={
      usuarioId:userID,
      pedidoeId:5,
      mesaId:this.filtersConfig.tableId
    }

    console.log(filters);
    console.log(type);

    await this._vendorService.findOrderByUserOrTable(type,filters).then(resp => {
      this.order = resp;
      if (this.order.length<=0) {
        this.searchOrder = false;
        return Swal.fire({
          icon: 'warning',
          title: 'No se encontro ninguna orden',
          text: `Intente nuevamente`
        });
      }else{
        this.searchOrder = true;
        console.log(resp);
        this.onTotalAmount();
      }

    })
  }

  onSelectTable(id){
    this.filtersConfig.tableId = id;
  }

  async onTotalAmount(){
    await this.order.map(item=>{
        this.totalAmount+=item.costo
        this.infoToPay.boleta.mesaId = item.mesaId
        this.infoToPay.usuarioId = item.usuarioId;
    })
    console.log(this.totalAmount);
  }

  onSelectedPayment(payment) {
    this.costototal = this.totalAmount;
    this.selectedPayment = true;
    if (payment.nombre === "Efectivo") {
      this.paymentSelect = "EFE";
    } else if (payment.nombre === "Tarjeta") {
      this.paymentSelect = "TAR";
    }

  }

  async onDoPayment() {
    this.infoToPay.pago.formaPago = this.paymentSelect;
    this.infoToPay.pago.propina = this.formFinder.value.propina;

    await this._vendorService.doNewPayment(this.infoToPay).then(resp => {
      console.log(resp);
      if (resp["code"] === 201) {
        this.voucher = resp['value'];
        this.nextStep();
        this.isDisabled0 = true;
        this.isDisabled1 = true;
        return Swal.fire({
          icon: 'success',
          title: 'Informacion de pago',
          text: `Se ah generado exitosamente`
        });
      } else {
        return Swal.fire({
          icon: 'error',
          title: 'Informacion de pago',
          text: `No se pudo generar el pago`
        });
      }
    }).catch(err => {
      console.log(err);
      this.prevStep();
      return Swal.fire({
        icon: 'error',
        title: 'Informacion de pago',
        text: `Existe un error en el pago - codigo:${err.status}`
      });
    })
  }

  onPrintVoucher(){
    let data = document.getElementById('voucher')
    html2canvas(data).then(function(canvas) {
      let imgData = canvas.toDataURL(
        'image/png');              
    let doc = new jsPDF('p', 'mm');
    doc.addImage(imgData,'PNG',10,10,0,0,);
    doc.save('sample-file.pdf');
  });
  }

  onSelectFilter(id) {
    console.log(id);
    switch (id) {
      case 1:
        this.filtersConfig.mail = true;
        this.filtersConfig.table = false;
        break;
      case 2:
        this.filtersConfig.mail = false;
        this.filtersConfig.table = true;
        break;

      default:
        break;
    }
  }


  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    console.log(this.step);
    if (this.step === 0) {

      this.isDisabled1 = false;
    } else if (this.step === 1) {
      this.isDisabled2 = false;
    }
    this.step++;
  }
  prevStep() {
    console.log(this.step);
    if (this.step === 0) {
      this.isDisabled0 = true;
    } else if (this.step === 1) {
      this.isDisabled1 = true;
    } else if (this.step === 2) {
      this.isDisabled2 = true;
    }
    this.step--;
  }
}
