import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { OrderProductService } from 'src/app/services/order/order-product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import Swal from 'sweetalert2';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Order {
  orderId: number;
  boxTypes: {
    boxTypeId: number;
    name: string;
    provider: '',
    format: '',
    strawAmount: ''
  },
  pickUpDate: Date;
  pickUpHour: Date;
  packagesNumber: number;
  strawsNumber: number;
  enabled:boolean;
}

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewOrdersComponent implements OnInit {

  orders: any = [] = [];
  columns: string[] = ['orderNumber', 'boxType', 'packagesNumber',
                       'strawsNumber', 'pickUpDate', 'pickUpHour', 'enabled'];
  dataSource: any;
  startDate?: Date | null;
  endDate?: Date | null;
  boxTypes: any = [] = [];
  clickedRows = new Set<Order>();
  hoveredRows = new Set<Order>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private orderService:OrderService,
              private boxTypeService:BoxTypeService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadOrders();
    this.boxTypeService.listBoxTypes().subscribe(
      boxTypes => this.boxTypes = boxTypes,
      error => console.error('Error al obtener los tipos de empaquetado.', error)
    );
  }

  loadOrders() {
    this.orderService.listOrders().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las ordenes.', 'error');
        throw error;
      }),
      finalize(() => {
  
      })
    ).subscribe((data: any) => {
      data.sort((a: Order, b: Order) => new Date(b.pickUpDate).getTime() - new Date(a.pickUpDate).getTime());
        if (!this.startDate && !this.endDate) {
          data.sort((a: Order, b: Order) => new Date(b.pickUpDate).getTime() - new Date(a.pickUpDate).getTime());
          data = data.slice(0,20);
      }
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToUpdateOrder(order: Order): void {
    this.router.navigate(['/admin/orders/id/', order.orderId]);
  }

  onRowMouseEnter(row: Order): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: Order): void {
    this.hoveredRows.delete(row);
  }

  deleteOrder(orderId:any) {
    Swal.fire({
      title: `Eliminar ordem?`,
      text: `¿Estas seguro que deseas eliminar la orden con id: ${orderId}?`,
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
            this.orders = this.orders.filter((order:any) => order.orderId != orderId);
            Swal.fire({
              title: 'Éxito',
              text: `La orden con id: ${orderId} eliminado correctamente.`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.loadOrders();
            });
          },
          (error) => {
            Swal.fire('Error', `Error al eliminar la orden con id: ${orderId}.`, 'error');
          }
        )
      }
    })
  }

  applyFilters() {
    if (!this.startDate && !this.endDate) {
      Swal.fire({
        icon: 'warning',
        title: 'No se detecto rango de fechas ni responsable',
        text: 'Debe seleccionar un rango de fechas o un responsable para aplicar el filtro',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.startDate && this.endDate) {
      const filteredData = this.orders.filter((order: any) => {
        const orderDate = new Date(order.date);
        return (!this.startDate || orderDate >= this.startDate) &&
                (!this.endDate || orderDate <= this.endDate);
      });
      this.orderService.listOrdersByDateRange(this.startDate, this.endDate).pipe(
        catchError((error) => {
          console.log(error);
          Swal.fire('Error', 'Error al cargar las ordenes filtradss.', 'error');
          throw error;
        }),
        finalize(() => {})
       ).subscribe((data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
       });
    } else {
      this.loadOrders();
    }
    
  }
  
  clearDateFilter() {
    this.startDate = null;
    this.endDate = null;
    this.loadOrders();
    }


}
