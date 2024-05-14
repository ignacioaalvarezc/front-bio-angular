import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize } from 'rxjs';
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
  boxType: {
    boxTypeId: number;
    name: string;
    provider: string;
    format: string;
  }
  pickUpDate: Date;
  pickUpHour: Date;
  packagesNumber: number;
}

@Component({
  selector: 'app-view-complete-orders',
  templateUrl: './view-complete-orders.component.html',
  styleUrls: ['./view-complete-orders.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewCompleteOrdersComponent implements OnInit {

  orders: any = [] = [];
  columns: string[] = ['orderId', 'boxType', 'packagesNumber', 'pickUpDate', 'pickUpHour', 'enabled'];
  dataSource: any;
  startDate?: Date | null;
  endDate?: Date | null;
  boxTypes: any = [] = [];
  clickedRows = new Set<Order>();
  hoveredRows = new Set<Order>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private orderService:OrderService,
              private boxTypeService:BoxTypeService) { }

  ngOnInit(): void {
    this.loadOrders();
    this.boxTypeService.listBoxTypes().subscribe(
      boxTypes => this.boxTypes = boxTypes,
      error => console.error('Error al obtener los tipos de empaquetado', error)
    );
  }

  loadOrders() {
    this.orderService.listOrders().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los empaquetados', 'error');
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

  applyFilters() {
    if (!this.startDate && !this.endDate) {
      Swal.fire({
        icon: 'warning',
        title: 'No se detecto ningún rango de fechas.',
        text: 'Debe seleccionar un rango de fechas.',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.startDate && this.endDate) {
      const filteredData = this.orders.filter((order: any) => {
        const orderDate = new Date(order.pickUpDate);
        return (!this.startDate || orderDate >= this.startDate) &&
                (!this.endDate || orderDate <= this.endDate);
      });
      this.orderService.listOrdersByDateRange(this.startDate, this.endDate).pipe(
        catchError((error) => {
          console.log(error);
          Swal.fire('Error', 'Error al cargar las ordenes filtradas', 'error');
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
