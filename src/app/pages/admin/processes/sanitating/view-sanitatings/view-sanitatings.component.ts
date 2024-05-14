import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';
import { MY_FORMATS } from '../../reception/view-receptions/view-receptions.component';
/*



interface SanitatedBasket {
  sanitatedBasketId: number;
  responsibles: {
    responsibleId: number;
    name: string;
  },
  strawTypes: {
    strawtypeId: number;
    name: string;
  },
  date: Date;
  hour: Date;
  weightBeforeDrying: number;
  wetWeight: number;
  weightAfterDrying: number;
  weightGainPercentage: number; //Porcentaje de aumento de peso: Fórmula: ((Peso del producto seco después de ser mojado - Peso del producto seco antes de ser mojado) / Peso del producto seco antes de ser mojado) * 100 || Esta métrica muestra el incremento porcentual del peso del producto después de ser mojado en relación con su peso original.
  waterRetentionPercentage: number; //Porcentaje de retención de agua: Fórmula: ((Peso del producto seco después de ser mojado - Peso del producto seco antes de ser mojado) / (Peso del producto seco después de ser mojado)) * 100 || Esta métrica indica qué porcentaje del peso del producto después de ser mojado está compuesto por agua.
  observations: string;
  state: boolean;

}
*/
@Component({
  selector: 'app-view-sanitatings',
  templateUrl: './view-sanitatings.component.html',
  styleUrls: ['./view-sanitatings.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewSanitatingsComponent  {

  /*

  sanitatings: any = [] = [];
  columns: string[] = ['sanitatedBasketId', 'responsible', 'strawType',
                       'weightBeforeDrying', 'wetWeight', 'weightAfterDrying',
                       'weightGainPercentage', 'waterRetentionPercentage', 'date', 'hour', 'state']
  dataSource: any;
  startDate?: Date | null;
  endDate?: Date | null;
  responsibles: any = [] = [];
  strawTypes: any = [] =[];
  searchByName: string = '';
  clickedRows = new Set<SanitatedBasket>();
  hoveredRows = new Set<SanitatedBasket>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private sanitatingService:SanitatingService,
              private responsibleService:ResponsibleService,
              private strawService:StrawService,
              private router:Router) { }

  ngOnInit(): void {
    this.responsibleService.listResponsibles().subscribe(
      responsibles => this.responsibles = responsibles,
      error => console.error('Error al obtener los responsables', error)
    );
    this.strawService.listStrawTypes().subscribe(
      strawTypes => this.strawTypes = strawTypes,
      error => console.error('Error al obtener los tipos de bíombillas', error)
    );
    this.loadSanitatings();
  }

  loadSanitatings() {
  this.sanitatingService.listSanitatings().pipe(
    catchError((error) => {
      console.log(error);
      Swal.fire('Error', 'Error al cargar las recepciones', 'error');
      throw error;
    }),
    finalize(() => {

    })
  ).subscribe((data: any) => {
    data.sort((a: SanitatedBasket, b: SanitatedBasket) => {
      if (a.state && !b.state) return 1;
      if (!a.state && b.state) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  });
}

navigateToUpdateSanitating(sanitatedBasket: SanitatedBasket): void {
  this.router.navigate(['/admin/sanitatedBaskets/id/', sanitatedBasket.sanitatedBasketId]);
}

onRowMouseEnter(row: SanitatedBasket): void {
  this.hoveredRows.add(row);
}

onRowMouseLeave(row: SanitatedBasket): void {
  this.hoveredRows.delete(row);
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
    const filteredData = this.sanitatings.filter((sanitating: any) => {
      const sanitatingDate = new Date(sanitating.date);
      return (!this.startDate || sanitatingDate >= this.startDate) &&
              (!this.endDate || sanitatingDate <= this.endDate);
    });
    this.sanitatingService.listSanitatingsByDateRange(this.startDate, this.endDate).pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las recepciones filtradas', 'error');
        throw error;
      }),
      finalize(() => {

      })).subscribe((data: any) => {
            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
        });
    } else {
      this.loadSanitatings();
  }
}

applySearchByNameFilter() {
  if(!this.searchByName) {
    this.loadSanitatings();
    return;
  }
  this.sanitatingService.searchSanitatingsByName(this.searchByName).subscribe(
    (data: any) => {
      this.sanitatings = data;
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
  this.loadSanitatings();
  }

  */


}
