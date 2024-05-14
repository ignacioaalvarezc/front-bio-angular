import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { CutBox } from 'src/app/models/cutting/cutBox';
import { Cutting } from 'src/app/models/cutting/cutting';
import { CutBoxService } from 'src/app/services/cutting/cut-box.service';
import { CuttingService } from 'src/app/services/cutting/cutting.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-cut-production',
  templateUrl: './view-cut-production.component.html',
  styleUrls: ['./view-cut-production.component.scss']
})
export class ViewCutProductionComponent implements OnInit {

  public totalAmountForMiniCuts: number = 0;
  public totalAmountForStandardCuts: number = 0;
  public totalAmountForBiggyCuts: number = 0;

  public currentYear: number = new Date().getFullYear();


  responsibles: any = [] = [];
  cutBoxes: any = [] = [];
  columns: string[] = ['responsible', 'cutType', 'weight', 'amount', 'date', 'endTime'];
  columnsTotalHours: string [] = ['responsible', 'totalHours'];
  dataSourceTotalHours: any;
  dataSource: any;
  clickedRows = new Set<Cutting>();
  hoveredRows = new Set<Cutting>();
  startDate?: Date | null;
  endDate?: Date | null;



  constructor(private boxService:CutBoxService,
              private responsibleService:ResponsibleService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadCutBoxes();
    this.loadResponsibles();
    this.getTotalMiniCutsOfYear();
    this.getTotalStandardCutsOfYear();
    this.getTotalBiggyCutsOfYear();
  }



  loadResponsibles() {
    this.responsibleService.listResponsibles().subscribe(
      responsibles => this.responsibles = responsibles,
      error => console.error('Error al obtener los responsables', error)
    );
  }
  
  
  loadCutBoxes() {
    this.boxService.listCutBoxes().pipe(
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
      data.sort((a: CutBox, b: CutBox) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (!this.startDate && !this.endDate) {
        data.sort((a: CutBox, b: CutBox) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      this.dataSource = new MatTableDataSource<any>(data.slice(0, 6));
    });
  }

  formatLocalTime(timeString: string | null): string {
    if (timeString) {
      const parts = timeString.split(':');
      if (parts.length === 3) {
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        const seconds = parseInt(parts[2], 10);
        // Aquí puedes hacer algo con las partes separadas, por ejemplo, formatear la hora
        return `${hours}:${minutes}:${seconds}`;
      }
    }
    // En caso de que la cadena sea nula o no tenga el formato esperado, puedes devolver un valor por defecto
    return '00:00:00';
  }

  navigateToUpdateCutBox(cutBox: CutBox): void {
    this.router.navigate(['/admin/cutBoxes/id/', cutBox.cutBoxId]);
  }
  

  getTotalMiniCutsOfYear(): void {
    this.boxService.getTotalAmountForMiniCuts().subscribe(
      (total: number) => {
        this.totalAmountForMiniCuts = total;
        console.log('Total recibido:', total);
      },
      (error) => {
        console.error('Error al obtener el total de la suma de amount para cortes Mini:', error);
      }
    )
  }

  getTotalStandardCutsOfYear(): void {
    this.boxService.getTotalAmountForStandardCuts().subscribe(
      (total: number) => {
        this.totalAmountForStandardCuts = total;
        console.log('Total recibido:', total);
      },
      (error) => {
        console.error('Error al obtener el total de la suma de amount para cortes Standard:', error);
      }
    )
  }

  getTotalBiggyCutsOfYear(): void {
    this.boxService.getTotalAmountForBiggyCuts().subscribe(
      (total: number) => {
        this.totalAmountForBiggyCuts = total;
        console.log('Total recibido:', total);
      },
      (error) => {
        console.error('Error al obtener el total de la suma de amount para cortes Biggy:', error);
      }
    )
  }

}
