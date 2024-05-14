import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-orders',
  templateUrl: './update-orders.component.html',
  styleUrls: ['./update-orders.component.scss'],
  providers: [DatePipe]
})
export class UpdateOrdersComponent implements OnInit {

  orderId = 0;
  order: any = {};
  boxTypes: any;
  selectedBoxType: any;

  constructor(private route:ActivatedRoute,
              private orderService:OrderService,
              private boxTypeService:BoxTypeService,
              private router:Router,
              private location:Location,
              private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['orderId'];
    this.boxTypeService.listBoxTypes().subscribe(
      (data:any) => {
        this.boxTypes = data;
      },
      (error) => {
        alert('Error al cargar los tipo de empaquetado.');
      }
    );
    this.orderService.getOrder(this.orderId).subscribe(
      (data:any) => {
        this.order = data;
        this.selectedBoxType = this.order.boxType.boxTypeId;
        console.log(this.order);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public updateOrder() {
    const id = this.order.orderId;
    Swal.fire({
      title: 'Confirmar actualización',
      text: `¿Estás seguro de que quieres actualizar la orden número ${id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.order.packagesNumber !== '') {
          const totalStraws= Number(this.order.packagesNumber) * Number(this.order.boxType.strawAmount);
          this.order.strawsNumber = Math.round(totalStraws).toString();
        }
        this.order.pickUpDate = this.datePipe.transform(this.order.pickUpDate, 'yyyy-MM-dd');
        this.orderService.updateOrder(this.orderId, this.order).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', `La orden número ${id} ha sido actualizada con éxito`, 'success').then(() => {
              this.router.navigate(['admin/view-orders']);
            });
          },
          (error) => {
            Swal.fire('Error', `La orden número ${id} no ha podido ser actualizada.`, 'error').then(
              (e) => {
                console.log(e);
              }
          );
        }
      );
    }
  });
  }

  goBack(): void {
    this.location.back();
  }

  deleteOrder(orderId:any) {
    const id = this.order.orderId;
    Swal.fire({
      title: `Eliminar orden`,
      text: `¿Estas seguro que deseas eliminar la orden N° ${id}?`,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.orderService.deleteOrder(orderId).subscribe(
          (data) => {
            this.order= {};
            Swal.fire({
              title: 'Éxito',
              text: `La orden N° ${id} ha sido eliminada correctamente.`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['admin/view-orders']);
            });
          },
          (error) => {
            Swal.fire('Error', `Error al eliminar la orden N° ${id}.`, 'error');
          }
        )
      }
    })
  }

}
