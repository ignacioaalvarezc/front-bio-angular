import { Component, OnInit, ViewChild } from '@angular/core';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { SizingService } from 'src/app/services/processes/sizing.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddSizingsComponent } from '../add-sizings/add-sizings.component';
import { SearchSizing } from '../../../../../models/search/search-sizing';
import { format } from 'date-fns';

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

interface Sizing {
  sizedBasketId: number;
  responsibles: {
    responsibleId: number;
    name: string;
  };
  strawTypes: {
    strawTypeId: number;
    name: string;
  }
  name: string;
  date: Date;
  hour: Date;
  weight: number;
  amount: number;
}

@Component({
  selector: 'app-view-sizings',
  templateUrl: './view-sizings.component.html',
  styleUrls: ['./view-sizings.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewSizingsComponent implements OnInit{


  showFilter: { [key: string]: boolean } = {};
  filterValues: { [key: string]: string } = {};
  sizings: any = [] = [];
  responsibles: any = [] = [];
  strawTypes: any = [] = [];
  selectedResponsible: any = null;
  selectedStrawType: any = null;
  selectedStartDate: Date;
  search: SearchSizing = {
    responsible: '',
    strawType: '',
    startWeight: null,
    endWeight: null,
    startAmount: null,
    endAmount: null,
    startDate: null,
    endDate: null
  }
  columns: string[] = ['sizedBasketId', 'responsible', 'strawType', 'weight', 'amount', 'date', 'hour'];
  dataSource: any;
  startDate?: Date | null;
  endDate?: Date | null;
  searchByName: string = '';
  clickedRows = new Set<Sizing>();
  hoveredRows = new Set<Sizing>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private responsibleService:ResponsibleService,
              private sizingService:SizingService,
              private router:Router,
              private strawService:StrawService) { }

  ngOnInit(): void {
    this.loadSizings();
    this.loadStrawTypes();
    this.loadResponsibles();
  }

  loadResponsibles() {
    this.responsibleService.listResponsibles().subscribe(
      responsibles => this.responsibles = responsibles,
      error => console.error('Error al obtener los responsables', error));
  }

  loadStrawTypes() {
    this.strawService.listStrawTypes().subscribe(
      strawTypes => this.strawTypes = strawTypes,
      error => console.error('Error al obtener los tipos de bíombilla', error));
  }

  loadSizings() {
    this.sizingService.sizings(this.search).pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los canastos de bíombillas dimensionados.', 'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data: any) => {
      data.sort((a: Sizing, b: Sizing) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (!this.startDate && !this.endDate) {
        data.sort((a: Sizing, b: Sizing) => new Date(b.date).getTime() - new Date(a.date).getTime());
        data = data.slice(0,20);
      }
      this.dataSource = new MatTableDataSource<any>(data);   
      this.dataSource.paginator = this.paginator;
    });
  }

  formatLocalTime(timeStr: string): string {
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
  }
  

  applyFilters() {
    if (!this.search.startDate && !this.search.endDate) {
      const filteredData = this.sizings.filter((sizing: any) => {
        const sizingDate = new Date(sizing.date);
        return (!this.startDate || sizingDate >= this.startDate) &&
               (!this.endDate || sizingDate <= this.endDate);
    });
    this.sizingService.listSizingProcessesByDateRange(this.search.startDate, this.search.endDate).pipe(
        catchError((error) => {
          console.log(error);
          Swal.fire('Error', 'Error al cargar los procesos de dimensionado filtrados', 'error');
          throw error;
        }),
        finalize(() => {})
       ).subscribe((data: any) => {
          data.sort((a: Sizing, b: Sizing) => new Date(b.date).getTime() - new Date(a.date).getTime());
            if (!this.search.startDate && !this.search.endDate) {
              data.sort((a: Sizing, b: Sizing) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
       });
    } else {
      this.loadSizings();
    }
  }

  applySearchByNameFilter() {
    if(!this.searchByName) {
      this.loadSizings();
      return;
    }
    this.sizingService.searchSizingsByName(this.searchByName).subscribe(
      (data: any) => {
        data.sort((a: Sizing, b: Sizing) => new Date(b.date).getTime() - new Date(a.date).getTime());
          if (!this.startDate && !this.endDate) {
            data.sort((a: Sizing, b: Sizing) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }
        this.sizings = data;
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al buscar por nombre del responsable', error);
      }
    );
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

  onChangeStrawType() {
    if (this.selectedStrawType) {
      this.search.strawType = this.selectedStrawType.name;
    } else {
      this.search.strawType = '';
    }
    this.applySearchByNameFilter();
    this.closeFilter('strawType');
  }
  
  closeFilter(column: string): void {
    this.showFilter[column] = false;
  }
  
  
  clearDateFilter() {
      this.selectedResponsible = null;
      this.selectedStrawType = null;
      this.search.responsible = '';
      this.search.strawType = '';
      this.search.startWeight = null;
      this.search.endWeight = null;
      this.search.startAmount = null;
      this.search.endAmount = null;
      this.search.startDate = null;
      this.search.endDate = null;
      this.closeFilter('responsible');
      this.closeFilter('strawType');
      this.closeFilter('startWeight');
      this.closeFilter('startAmount');
      this.closeFilter('startDate');
      this.loadSizings();
    }

  navigateToUpdateSizing(sizing: Sizing): void {
    this.router.navigate(['/admin/sizedBaskets/id/', sizing.sizedBasketId]);
  }

  onRowMouseEnter(row: Sizing): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: Sizing): void {
    this.hoveredRows.delete(row);
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
    this.sizingService.exportToPdf(filteredData).subscribe(
      (data: Blob) => {
        this.downloadPdf(data);
      },
      error => {
        console.error('Error to export PDF: ', error);
      }
    );
  }

  exportAllDataToPdf(): void {
    this.sizingService.listSizingProcesses().subscribe(
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
    a.download = "Reporte_de_dimensionados_" + `${currentDate}` + ".pdf";
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
    this.sizingService.exportToExcel(filteredData).subscribe(
      (data: Blob) => {
        this.downloadExcel(data);
      },
      error => {
        console.error('Error to export PDF: ', error);
      }
    );
  }

  exportAllDataToExcel(): void {
    this.sizingService.listSizingProcesses().subscribe(
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
    a.download = "Reporte_de_recepciones_" + `${currentDate}` + ".xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  toggleFilter(column: string): void {
    Object.keys(this.showFilter).forEach(key => {
      if (key !== column) {
        this.showFilter[key] = false;
      }
    });
    this.showFilter[column] = !this.showFilter[column];

  }

  

}
