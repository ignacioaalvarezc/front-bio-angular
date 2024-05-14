import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { catchError, finalize } from 'rxjs';
import { CutBox } from 'src/app/models/cutting/cutBox';
import { Cutting } from 'src/app/models/cutting/cutting';
import { CutBoxService } from 'src/app/services/cutting/cut-box.service';
import { CutTypeService } from 'src/app/services/cutting/cut-type.service';
import { CuttingService } from 'src/app/services/cutting/cutting.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';
import { SearchCutBox } from './search';

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


@Component({
  selector: 'app-view-cuttings',
  templateUrl: './view-cuttings.component.html',
  styleUrls: ['./view-cuttings.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewCuttingsComponent implements OnInit{

  showFilter: { [key: string]: boolean } = {};
  filterValues: { [key: string]: string } = {};
  responsibles: any = [] = [];
  cutTypes: any = [] = [];
  cutBoxes: any = [] = [];
  columns: string[] = ['cuttingId', 'cutBoxId', 'responsible', 'cutType', 'weight', 'factor', 'amount', 'date', 'hour']
  dataSource: any;
  startDate?: Date | null;
  endDate?: Date | null;
  selectedResponsible: any = null;
  selectedCutTypes: any = null;
  search: SearchCutBox = {
    responsible: '',
    cutType: '',
    startWeight: null,
    endWeight: null,
    startAmount: null,
    endAmount: null,
    startDate: null,
    endDate: null
  }
  
  
  searchByName: string = '';
  searchByCutType: string = '';
  clickedRows = new Set<CutBox>();
  hoveredRows = new Set<CutBox>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private boxService:CutBoxService,
              private responsibleService:ResponsibleService,
              private typeService:CutTypeService,
              private router:Router,
            private cuttingService:CuttingService) { }

  ngOnInit(): void {
    this.loadResponsibles();
    this.loadCutTypes();
    this.loadCutBoxes();
  }

  loadResponsibles() {
    this.responsibleService.listResponsibles().subscribe(
      responsibles => this.responsibles = responsibles,
      error => console.error('Error al obtener los responsables', error)
    );
  }

  loadCutTypes() {
    this.typeService.listCutTypes().subscribe(
      cutTypes => this.cutTypes = cutTypes,
      error => console.error('Error al obtener los tipos de corte.', error)
    );
  }

  loadCutBoxes() {
    this.boxService.cutBoxes(this.search).pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 
                  'Error al cargar las cajas de corte.', 
                  'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data:any) => {
      data.sort((a: Cutting, b: Cutting) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (!this.startDate && !this.endDate) {
        data.sort((a: Cutting, b: Cutting) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToUpdateCutBox(cutBox: CutBox): void {
    this.router.navigate(['/admin/cutBoxes/id/', cutBox.cutBoxId]);
  }

  onRowMouseEnter(row: CutBox): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: CutBox): void {
    this.hoveredRows.delete(row);
  }

  formatLocalTime(timeStr: string): string {
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
  }

  /*
  deleteCutting(cuttingId:any) {
    Swal.fire({
      title: `Eliminar proceso de corte de nudos?`,
      text: '¿Estas seguro que deseas eliminar este proceso de corte?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.cuttingService.deleteCutting(cuttingId).subscribe(
          (data) => {
            this.cuttings = this.cuttings.filter((cutting:any) => cutting.cuttingId != cuttingId);
            Swal.fire({
              title: 'Proceso de corte eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.loadCuttings();
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el proceso de corte', 'error');
          }
        )
      }
    })
  }
  applyFilters() {
    if (!this.startDate && !this.endDate) {
      Swal.fire({
        icon: 'warning',
        title: 'No se detecto rango de fechas',
        text: 'Debe seleccionar un rango de fechas para aplicar el filtro',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.startDate && this.endDate) {
      const filteredData = this.cuttings.filter((cutting: any) => {
        const cuttingDate = new Date(cutting.date);
        return (!this.startDate || cuttingDate >= this.startDate) &&
               (!this.endDate || cuttingDate <= this.endDate);
      });
      this.cuttingService.listCuttingsByDateRange(this.startDate, this.endDate).pipe(
        catchError((error) => {
          console.log(error);
          Swal.fire('Error', 'Error al cargar los proceso de corte filtrados', 'error');
          throw error;
        }),
        finalize(() => {})
       ).subscribe((data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
       });
    } else {
      this.loadCuttings();
    }
  }

  applySearchByNameFilter() {
    if(!this.searchByName) {
      this.loadCuttings();
      return;
    }
    this.cuttingService.searchCuttingsByName(this.searchByName).subscribe(
      (data: any) => {
        this.cuttings = data;
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al buscar por nombre del responsable', error);
      }
    );
  }
  
  clearDateFilter() {
    this.startDate = null;
    this.endDate = null;
    this.searchByName = null;
    this.loadCuttings();
    }
    
  */

    onChangeResponsible() {
      if (this.selectedResponsible) {
        this.search.responsible = this.selectedResponsible.name;
      } else {
        this.search.responsible = '';
      }
      this.applySearchByNameFilter();
      this.closeFilter('responsible');
    }

    onChangeCutType() {
      if (this.selectedCutTypes) {
        this.search.cutType = this.selectedCutTypes.name;
      } else {
        this.search.cutType = '';
      }
      this.applySearchByCutTypeNameFilter();
      this.closeFilter('cutType');
    }

    applySearchByNameFilter() {
      if(!this.searchByName) {
        this.loadCutBoxes();
        return;
      }
      this.boxService.searchCutBoxesByName(this.searchByName).subscribe(
        (data: any) => {
          data.sort((a: CutBox, b: CutBox) => new Date(b.date).getTime() - new Date(a.date).getTime());
          if (!this.startDate && !this.endDate) {
            data.sort((a: CutBox, b: CutBox) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
          this.cutBoxes = data;
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.error('Error al buscar por nombre del operador', error);
        }
      );
    }

    applySearchByCutTypeNameFilter() {
      if(!this.search.cutType) {
        this.loadCutBoxes();
        return;
      }
      this.boxService.searchCutBoxesByCutTypeName(this.search.cutType).subscribe(
        (data: any) => {
          data.sort((a: CutBox, b: CutBox) => new Date(b.date).getTime() - new Date(a.date).getTime());
          if (!this.startDate && !this.endDate) {
            data.sort((a: CutBox, b: CutBox) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
          this.cutBoxes = data;
          this.dataSource = new MatTableDataSource<any>(data);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.error('Error al buscar por nombre del tipo de bíombilla.', error);
        }
      );
    }
    
    closeFilter(column: string): void {
      this.showFilter[column] = false;
    }

    toggleFilter(column: string): void {
      Object.keys(this.showFilter).forEach(key => {
        if (key !== column) {
          this.showFilter[key] = false;
        }
      });
      this.showFilter[column] = !this.showFilter[column];
  
    }

    clearDateFilter() {
      this.selectedResponsible = null;
      this.selectedCutTypes = null;
      this.search.responsible = '';
      this.search.startWeight = null;
      this.search.endWeight = null;
      this.search.startAmount = null;
      this.search.endAmount = null;
      this.search.startDate = null;
      this.search.endDate = null;
      this.closeFilter('responsible');
      this.closeFilter('cutType');
      this.closeFilter('startWeight');
      this.closeFilter('startAmount');
      this.closeFilter('startDate');
      this.loadCutBoxes();
      }


exportPdf(): void {
    const filteredData = this.dataSource.filteredData;
    if(filteredData && filteredData.length > 0) {
      this.exportFilteredDataToPdf(filteredData);
    } else {
      this.exportAllDataToPdf();
    }
  }

  exportFilteredDataToPdf(filteredData: any[]): void {
    this.boxService.exportToPdf(filteredData).subscribe(
      (data: Blob) => {
        this.downloadPdf(data);
      },
      error => {
        console.error('Error to export PDF: ', error);
      }
    );
  }

  exportAllDataToPdf(): void {
    this.boxService.listCutBoxes().subscribe(
      (data: any[]) => {
        this.exportFilteredDataToPdf(data);
      },
      error => {
        console.error('Error getting all data to export to PDF: ', error)
      }
    );
  }

  downloadPdf(data: Blob): void {
    const filteredColumns = this.dataSource.filteredColumns;
    const currentDate: string = format(new Date(), 'dd-MM-yyyy-HH_mm');
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Reporte_de_cortes_" + `${currentDate}` + ".pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  exportExcel(): void {
    const filteredData = this.dataSource.filteredData;
    if(filteredData && filteredData.length > 0) {
      this.exportFilteredDataToExcel(filteredData);
    } else {
      this.exportAllDataToExcel();
    }
  }

  exportFilteredDataToExcel(filteredData: any[]): void {
    this.boxService.exportToExcel(filteredData).subscribe(
      (data: Blob) => {
        this.downloadExcel(data);
      },
      error => {
        console.error('Error to export PDF: ', error);
      }
    );
  }

  exportAllDataToExcel(): void {
    this.boxService.listCutBoxes().subscribe(
      (data: any[]) => {
        this.exportFilteredDataToExcel(data);
      },
      error => {
        console.error('Error getting all data to export to EXCEL: ', error)
      }
    );
  }

  downloadExcel(data: Blob): void {
    const filteredColumns = this.dataSource.filteredColumns;
    const currentDate: string = format(new Date(), 'dd-MM-yyyy-HH_mm');
    const blob = new Blob([data], { type: 'application/xlsx' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Reporte_de_cortes_" + `${currentDate}` + ".xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
    
}
