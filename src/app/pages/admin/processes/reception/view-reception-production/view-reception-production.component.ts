import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { catchError, finalize } from 'rxjs';
import { Reception } from 'src/app/models/reception/reception';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import Swal from 'sweetalert2';
import { SearchReceptionProd } from './searchReceptionProd';

@Component({
  selector: 'app-view-reception-production',
  templateUrl: './view-reception-production.component.html',
  styleUrls: ['./view-reception-production.component.scss']
})
export class ViewReceptionProductionComponent {

  showFilter: { [key: string]: boolean } = {};
  filterValues: { [key: string]: string } = {};
  responsibles: any = [] = [];
  receptions: any = [] = [];
  columns: string[] = ['receptionId', 'responsible', 'startTime', 'endTime', 'totalHours', 'date'];
  dataSource: any;
  startDate?: Date | null;
  endDate?: Date | null;
  selectedResponsible: any = null;
  search: SearchReceptionProd = {
    responsible: '',
    startStartTime: null,
    endStartTime: null,
    startEndTime: null,
    endEndTime: null,
    startTotalHours: null,
    endTotalHours: null,
    startDate: null,
    endDate: null,
}
  clickedRows = new Set<Reception>();
  hoveredRows = new Set<Reception>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private receptionService:ReceptionService,
              private responsibleService:ResponsibleService,
              private router:Router,
              private location:Location) { }

  ngOnInit(): void {
    this.loadResponsibles();
    this.loadReceptions();
    }


  loadResponsibles() {
    this.responsibleService.listResponsibles().subscribe(
      responsibles => this.responsibles = responsibles,
      error => console.error('Error al obtener los responsables', error)
    );
  }
  
  loadReceptions() {
    this.receptionService.listReceptions().pipe(
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
      data.sort((a: Reception, b: Reception) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (!this.startDate && !this.endDate) {
        data.sort((a: Reception, b: Reception) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToUpdateReception(reception: Reception): void {
    this.router.navigate(['/admin/receptions/id/', reception.receptionId]);
  }
  
  onRowMouseEnter(row: Reception): void {
    this.hoveredRows.add(row);
  }
  
  onRowMouseLeave(row: Reception): void {
    this.hoveredRows.delete(row);
  }
  
  formatLocalTime(timeStr: string): string {
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
  }

  toggleFilter(column: string): void {
    Object.keys(this.showFilter).forEach(key => {
      if (key !== column) {
        this.showFilter[key] = false;
      }
    });
    this.showFilter[column] = !this.showFilter[column];
  
  }

  applySearchByNameFilter() {
    if(!this.search.responsible) {
      this.loadReceptions();
      return;
    }
    this.receptionService.receptionsProd(this.search).subscribe(
      (data: any) => {
        data.sort((a: Reception, b: Reception) => new Date(b.date).getTime() - new Date(a.date).getTime());
        if (!this.startDate && !this.endDate) {
          data.sort((a: Reception, b: Reception) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
        this.receptions = data;
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al buscar por nombre del operador', error);
      }
    );
  }
  
  
  closeFilter(column: string): void {
    this.showFilter[column] = false;
  }
  


  onChangeResponsible() {
    if (this.selectedResponsible) {
      this.search.responsible = this.selectedResponsible.name;
    } else {
      this.search.responsible = '';
    }
    this.applySearchByNameFilter();
    this.closeFilter('responsible');
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
    this.receptionService.exportToPdf(filteredData).subscribe(
      (data: Blob) => {
        this.downloadPdf(data);
      },
      error => {
        console.error('Error to export PDF: ', error);
      }
    );
    }
    
    exportAllDataToPdf(): void {
    this.receptionService.listReceptions().subscribe(
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
    this.receptionService.exportToExcel(filteredData).subscribe(
      (data: Blob) => {
        this.downloadExcel(data);
      },
      error => {
        console.error('Error to export PDF: ', error);
      }
    );
    }
    
    exportAllDataToExcel(): void {
    this.receptionService.listReceptions().subscribe(
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

  goBack(): void {
    this.location.back();
  }  

}
