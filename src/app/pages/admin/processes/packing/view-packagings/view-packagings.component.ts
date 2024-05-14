import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import { PackagingService } from 'src/app/services/packing/packaging.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
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

interface Packaging {
  packagingId: number;
  responsibles: {
    responsibleId: number;
    name: string;
  },
  boxType: {
    boxTypeId: '',
    name: '',
    provider: '',
    format: '',
    strawAmount: ''
  },
  date: Date;
  hour: Date;
  numberOfPackages: number;
  numberOfStraws: number;
  weightRejected: number;
  numberOfRejected: number;
}

@Component({
  selector: 'app-view-packagings',
  templateUrl: './view-packagings.component.html',
  styleUrls: ['./view-packagings.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewPackagingsComponent implements OnInit {

  packagings: any = [] = [];
  columns: string[] = ['packagingId', 'responsible', 'boxType', 'numberOfPackages',
                       'numberOfStraws', 'weightRejected', 'numberOfRejected',
                       'date', 'hour'];
  dataSource: any;
  startDate?: Date | null;
  endDate?: Date | null;
  responsibles: any = [] = [];
  boxTypes: any = [] = [];
  searchByName: string = '';
  clickedRows = new Set<Packaging>();
  hoveredRows = new Set<Packaging>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private packagingService:PackagingService,
              private responsibleService:ResponsibleService,
              private boxTypeService:BoxTypeService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadPackagings();
    this.responsibleService.listResponsibles().subscribe(
    responsibles => this.responsibles = responsibles,
    error => console.error('Error al obtener los responsables', error)
    );
    this.boxTypeService.listBoxTypes().subscribe(
      boxTypes => this.boxTypes = boxTypes,
      error => console.error('Error al obtener los tipos de empaquetado', error)
    );
  }

  loadPackagings() {
    this.packagingService.listPackagings().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los empaquetados', 'error');
        throw error;
      }),
      finalize(() => {
  
      })
    ).subscribe((data: any) => {
      data.sort((a: Packaging, b: Packaging) => new Date(b.date).getTime() - new Date(a.date).getTime());
        if (!this.startDate && !this.endDate) {
          data.sort((a: Packaging, b: Packaging) => new Date(b.date).getTime() - new Date(a.date).getTime());
          data = data.slice(0,20);
      }
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToUpdatePackaging(packaging: Packaging): void {
    this.router.navigate(['/admin/packagings/id/', packaging.packagingId]);
  }

  onRowMouseEnter(row: Packaging): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: Packaging): void {
    this.hoveredRows.delete(row);
  }

  deletePackaging(packagingId:any) {
    Swal.fire({
      title: `Eliminar empaquetado?`,
      text: `¿Estas seguro que deseas eliminar este empaquetado?`,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.packagingService.deletePackaging(packagingId).subscribe(
          (data) => {
            this.packagings = this.packagings.filter((packaging:any) => packaging.packagingId != packagingId);
            Swal.fire({
              title: 'Empaquetado eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.loadPackagings();
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el empaquetado', 'error');
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
      const filteredData = this.packagings.filter((packaging: any) => {
        const packagingDate = new Date(packaging.date);
        return (!this.startDate || packagingDate >= this.startDate) &&
                (!this.endDate || packagingDate <= this.endDate);
      });
      this.packagingService.listPackagingsByDateRange(this.startDate, this.endDate).pipe(
        catchError((error) => {
          console.log(error);
          Swal.fire('Error', 'Error al cargar los empaquetados filtrados', 'error');
          throw error;
        }),
        finalize(() => {})
       ).subscribe((data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
       });
    } else {
      this.loadPackagings();
    }
    
  }
  
  applySearchByNameFilter() {
    if(!this.searchByName) {
      this.loadPackagings();
      return;
    }
    this.packagingService.searchPackagingsByName(this.searchByName).subscribe(
      (data: any) => {
        this.packagings = data;
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al buscar por nombre del responsable', error);
      }
    );
  }
  
  clearDateFilter() {
    this.searchByName = null;
    this.startDate = null;
    this.endDate = null;
    this.loadPackagings();
    }
}
