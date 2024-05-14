import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.scss'],
  providers: [DatePipe]
})
export class AddOrdersComponent implements OnInit {

selectedHour: string = '00:00';

constructor(private orderService:OrderService,
            private boxTypeService:BoxTypeService,
            private snack:MatSnackBar,
            private location:Location,
            private router:Router,
            private datePipe:DatePipe) { }

  selectedDate: Date = new Date();
  orderNumber: string;
  boxTypes: any = [];
  orderData = {
    orderId: '',
    boxType: {
      boxTypeId: '',
      name: '',
      provider: '',
      format: '',
      strawAmount: '',
    },
    pickUpDate: '',
    pickUpHour: '',
    packagesNumber: '',
    strawsNumber: '',
    enabled: '',
    indications: '',
    orderNumber: ''
  }

  ngOnInit(): void {
    this.generateOrderNumber();
    this.orderData.orderId = this.orderNumber;
    this.selectedDate = new Date();
    this.boxTypeService.listBoxTypes().subscribe(
      (data:any) => {
        this.boxTypes = data;
        console.log(this.boxTypes);
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los tipos de empaquetado',
          icon: 'error'});
      }
    )
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


  generateOrderNumber() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = this.padZero(now.getMonth() + 1);
    const day = this.padZero(now.getDate());
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
    this.orderNumber = `${year}${month}${day}${hours}${minutes}`;
    this.orderData.orderNumber = this.orderNumber;
}

  goBack(): void {
    this.location.back();
  }

  saveOrder() {
    const id = this.orderData.orderId;
    Swal.fire({
      title: 'Confirmar registro',
      text: `Estas seguro de que quieres registrar la orden numero ${id}?.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed) {
        if (this.orderData.packagesNumber !== '') {
          const totalStraws= Number(this.orderData.packagesNumber) * Number(this.orderData.boxType.strawAmount);
          this.orderData.strawsNumber = Math.round(totalStraws).toString();
        }
        const selectedDateWithTime = new Date(this.selectedDate);
        selectedDateWithTime.setHours(Number(this.selectedHour.split(':')[0]));
        selectedDateWithTime.setMinutes(Number(this.selectedHour.split(':')[1]));
        selectedDateWithTime.setMinutes(selectedDateWithTime.getMinutes() - selectedDateWithTime.getTimezoneOffset());
        console.log(this.orderData);
        if (isNaN(selectedDateWithTime.getTime())) {
          console.error('La fecha no es válida');
          return;
        }
        const newDate = new Date(selectedDateWithTime);
        newDate.setDate(newDate.getDate() + 1);
        this.orderData.pickUpDate = newDate.toISOString().split('T')[0];
        this.orderData.pickUpHour = this.selectedHour;
        if(this.orderData.boxType == null) {
          this.snack.open('El tipo de empaquetado es requerido.', 'Aceptar', {
            duration: 3000
          });
          return;
        }
        this.orderData.pickUpDate = this.datePipe.transform(this.orderData.pickUpDate, 'yyyy-MM-dd');
        this.orderService.saveOrder(this.orderData).subscribe(
        (data) => {
          console.log(data);
          Swal.fire({
            title: 'Éxito',
            text: `La orden número ${id} ha sido registrada correctamente.`,
            icon: 'success'});
          this.orderData = {
            orderId: '',
            boxType: {
              boxTypeId: '',
              name: '',
              provider: '',
              format: '',
              strawAmount: ''
            },
            pickUpDate: '',
            pickUpHour: '',
            packagesNumber: '',
            strawsNumber: '',
            enabled: '',
            indications: '',
            orderNumber: ''
          };
          this.router.navigate(['/admin/view-orders/'])
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Error al registrar la orden número ${id}.`,
            icon: 'error'});
        }
      )
    }
  })
  }

}
