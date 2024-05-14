import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import Swal from 'sweetalert2';

interface BoxType {
  boxTypeId: number;
  name: string;
  provider: string;
  format: string;
  strawAmount: number;
  enabled: string;
}

@Component({
  selector: 'app-view-box',
  templateUrl: './view-box.component.html',
  styleUrls: ['./view-box.component.scss']
})
export class ViewBoxComponent implements OnInit {

  dataSource: any;
  boxTypes: any = [] = [];
  columns: string[] = ['boxTypeId', 'name', 'provider', 'format', 'strawAmount', 'enabled'];
  clickedRows = new Set<BoxType>();
  hoveredRows = new Set<BoxType>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private boxTypeService:BoxTypeService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadBoxTypes();
  }

  loadBoxTypes() {
    this.boxTypeService.listBoxTypes().pipe(
      catchError((error) => {
        Swal.fire('Error', 'Error al cargar los tipos de caja', 'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToUpdateBoxType(boxType: BoxType): void {
    this.router.navigate(['/admin/boxTypes/id/', boxType.boxTypeId]);
  }

  onRowMouseEnter(row: BoxType): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: BoxType): void {
    this.hoveredRows.delete(row);
  }

  deletePackaging(boxTypeId:any) {
    Swal.fire({
      title: `Eliminar tipo de caja?`,
      text: `¿Estas seguro que deseas eliminar este tipo de estuche?`,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.boxTypeService.deleteBoxType(boxTypeId).subscribe(
          (data) => {
            this.boxTypes = this.boxTypes.filter((boxType:any) => boxType.packagingId != boxTypeId);
            Swal.fire({
              title: 'Estuche eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.loadBoxTypes();
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el estuche.', 'error');
          }
        )
      }
    })
  }
}
