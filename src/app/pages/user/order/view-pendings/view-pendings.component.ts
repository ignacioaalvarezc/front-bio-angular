import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import Swal from 'sweetalert2';

interface Order {
  orderId: number;
  boxTypes: {
    boxTypeId: number;
    name: string;
    provider: string;
    format: string;
  },
  pickUpDate: Date;
  pickUpHour: Date;
  packagesNumber: number;
  indications: string;
  enabled: boolean;
}

@Component({
  selector: 'app-view-pendings',
  templateUrl: './view-pendings.component.html',
  styleUrls: ['./view-pendings.component.scss']
})
export class ViewPendingsComponent implements OnInit{

  order: any = [] = [];
  orderId: any;
  boxTypes: any = [] = [];
  dataSource: any;

  constructor(private route:ActivatedRoute,
              private orderService:OrderService,
              private boxTypeService:BoxTypeService,
              private router:Router,
              private location:Location,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.listOrders().subscribe(
      (data:any) => {
        this.order = data.filter((item:any) => item.enabled !== undefined && item.enabled === false);
        console.log(this.order);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error las ordenes pendientes.', 'error');
      }
    )
    
  }

  goBack(): void {
    this.router.navigate(['user-dashboard/user-welcome']);
  }

  public updateOrder(index: number) {
    const orderToUpdate = this.order[index];
    const id = orderToUpdate.orderId;
    Swal.fire({
      title: 'Confirmación',
      text: `¿Estas seguro de que quieres marcar como completada la orden N° ${id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrder(id, orderToUpdate).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', `La orden N° ${id} ha sido completada correctamente.`, 'success').then(() => {
              window.location.reload();
            });
    },
    (error) => {
      Swal.fire('Error', `La orden N° ${id} no ha podido ser completada`, 'error').then(
        (e) => {
          console.log(e);
          }
        );
      });
    }
  });
}


}
