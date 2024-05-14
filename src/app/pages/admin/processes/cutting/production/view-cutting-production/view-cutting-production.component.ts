import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Cutting } from 'src/app/models/cutting/cutting';
import { CuttingService } from 'src/app/services/cutting/cutting.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';

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
  selector: 'app-view-cutting-production',
  templateUrl: './view-cutting-production.component.html',
  styleUrls: ['./view-cutting-production.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewCuttingProductionComponent implements OnInit {

  showFilter: { [key: string]: boolean } = {};
  filterValues: { [key: string]: string } = {};
  responsibles: any = [] = [];
  cuttings: any = [] = [];
  columns: string[] = ['cuttingId', 'responsible', 'totalWeight', 'totalAmount', 'startTime', 'endTime', 'totalHours', 'date'];
  clickedRows = new Set<Cutting>();
  hoveredRows = new Set<Cutting>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private cuttingService:CuttingService,
              private responsibleService:ResponsibleService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadResponsibles();
    
  }

  loadResponsibles() {
    this.responsibleService.listResponsibles().subscribe(
      responsibles => this.responsibles = responsibles,
      error => console.error('Error al obtener los responsables', error)
    );
  }


}
