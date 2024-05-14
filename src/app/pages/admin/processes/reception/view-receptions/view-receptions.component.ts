import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Reception } from 'src/app/models/reception/reception';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { format } from 'date-fns';
import { SearchReception } from './search';
import { Location } from '@angular/common';

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
  selector: 'app-view-receptions',
  templateUrl: './view-receptions.component.html',
  styleUrls: ['./view-receptions.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewReceptionsComponent implements OnInit {

  showFilter: { [key: string]: boolean } = {};
  filterValues: { [key: string]: string } = {};
  responsibles: any = [] = [];
  receptions: any = [] = [];
  columns: string[] = ['receptionId', 'responsible', 'acceptedBales', 'rejectedBales', 'date', 'endTime', 'observations'];
  dataSource: any;
  startDate?: Date | null;
  endDate?: Date | null;
  selectedResponsible: any = null;
  search: SearchReception = {
    responsible: '',
    startAcceptedBales: null,
    endAcceptedBales: null,
    startRejectedBales: null,
    endRejectedBales: null,
    startDate: null,
    endDate: null,
}

  searchByName: string = '';
  searchByCutType: string = '';
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

onChangeResponsible() {
  if (this.selectedResponsible) {
    this.search.responsible = this.selectedResponsible.name;
  } else {
    this.search.responsible = '';
  }
  this.applySearchByNameFilter();
  this.closeFilter('responsible');
}

applySearchByNameFilter() {
  if(!this.search.responsible) {
    this.loadReceptions();
    return;
  }
  this.receptionService.receptions(this.search).subscribe(
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
  this.search.responsible = '';
  this.search.startAcceptedBales = null;
  this.search.endAcceptedBales = null;
  this.search.startRejectedBales = null;
  this.search.endRejectedBales = null;
  this.search.startDate = null;
  this.search.endDate = null;
  this.closeFilter('responsible');
  this.closeFilter('cutType');
  this.closeFilter('startAcceptedBales');
  this.closeFilter('startRejectedBales');
  this.closeFilter('startDate');
  this.loadReceptions();
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
