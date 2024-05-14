import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chart, ChartType } from 'chart.js';
import { Observable, catchError, finalize, forkJoin } from 'rxjs';
import { Reception } from 'src/app/models/reception/reception';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import Swal from 'sweetalert2';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill } from "ng-apexcharts";

  export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    legend: ApexLegend;
    fill: ApexFill;
  };

@Component({
  selector: 'app-view-reception-statistics',
  templateUrl: './view-reception-statistics.component.html',
  styleUrls: ['./view-reception-statistics.component.scss']
})
export class ViewReceptionStatisticsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  responsiblesWithHours: { responsible: String; hours: number }[];
  numbers: number[];

  
  public totalAcceptedBalesOfYear: number = 0;
  public totalRejectedBalesOfYear: number = 0;
  public percentageRejectedBales: number = 0;
  public totalAcceptedBales: number = 0;
  public currentYear: number = new Date().getFullYear()

  responsibles: any = [] = [];
  receptions: any = [] = [];
  columns: string[] = ['responsible', 'acceptedBales', 'rejectedBales', 'date', 'endTime'];
  operatorHoursDataSource: any;
  dataSource: any;
  clickedRows = new Set<Reception>();
  hoveredRows = new Set<Reception>();
  startDate?: Date | null;
  endDate?: Date | null;



  constructor(private receptionService:ReceptionService,
              private responsibleService:ResponsibleService,
              private router:Router) {

                this.chartOptions = {
                  series: [
                    {
                      name: "PRODUCT A",
                      data: [44, 55, 41, 67, 22, 43, 21, 49]
                    },
                    {
                      name: "PRODUCT B",
                      data: [13, 23, 20, 8, 13, 27, 33, 12]
                    },
                    {
                      name: "PRODUCT C",
                      data: [11, 17, 15, 15, 21, 14, 15, 13]
                    }
                  ],
                  chart: {
                    type: "bar",
                    height: 350,
                    stacked: true,
                    stackType: "100%"
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        legend: {
                          position: "bottom",
                          offsetX: -10,
                          offsetY: 0
                        }
                      }
                    }
                  ],
                  xaxis: {
                    categories: [
                      "2011 Q1",
                      "2011 Q2",
                      "2011 Q3",
                      "2011 Q4",
                      "2012 Q1",
                      "2012 Q2",
                      "2012 Q3",
                      "2012 Q4"
                    ]
                  },
                  fill: {
                    opacity: 1
                  },
                  legend: {
                    position: "right",
                    offsetX: 0,
                    offsetY: 50
                  }
                };
              }

  ngOnInit(): void {
    this.getTotalAcceptedBalesOfYear();
    this.getTotalRejectedBalesOfYear();
    this.getTotalBalesOfYear();
    this.getTotalAcceptedBales();
    this.loadReceptions();
    this.loadResponsibles();
    this.fetchReceptionsAndTotalHours();
  }

  fetchReceptionsAndTotalHours() {
    this.receptionService.getReceptionsAndTotalHoursForCurrentMonth().subscribe(
      (data: Reception) => {
        this.responsiblesWithHours = Object.entries(data).map(([responsible, hours]) => ({ responsible, hours }));
        this.responsiblesWithHours.sort((a, b) => b.hours - a.hours);
        this.numbers = Array.from({ length: this.responsiblesWithHours.length }, (_, index) => index + 1);
      },
      (error) => {
        console.error('Error al obtener la lista de responsables y horas:', error);
      }
    );
  }

  getCurrentMonthYear(): string {
    const currentDate = new Date();
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return `${monthNames[monthIndex]} ${year}`;
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
      this.dataSource = new MatTableDataSource<any>(data.slice(0, 6));
    });
  }

  formatLocalTime(timeStr: string): string {
    const parts = timeStr.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return timeStr;
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

  getTotalAcceptedBales(): void {
    this.receptionService.listReceptions().subscribe(
      (data: Reception[]) => {
        this.totalAcceptedBales = data.reduce((total, reception) => total + reception.acceptedBales, 0);
      },
      error => {
        console.error('Error al obtener los datos de recepción', error);
      }
    );
  }

  getTotalBalesOfYear(): void {
    this.receptionService.listReceptions().subscribe(
      (data: Reception[]) => {
        const currentYearReceptions = data.filter(reception => new Date(reception.date).getFullYear() === this.currentYear);
        this.totalAcceptedBalesOfYear = currentYearReceptions.reduce((total, reception) => total + reception.acceptedBales, 0);
        this.totalRejectedBalesOfYear = currentYearReceptions.reduce((total, reception) => total + reception.rejectedBales, 0);
        this.calculatePercentageRejectedBales();
      },
      error => {
        console.error('Error al obtener los datos de recepción', error);
      }
    );
  }

  calculatePercentageRejectedBales(): void {
    const totalBales = this.totalAcceptedBalesOfYear + this.totalRejectedBalesOfYear;
    this.percentageRejectedBales = (this.totalRejectedBalesOfYear / totalBales) * 100;
  }

 

    getTotalAcceptedBalesOfYear(): void {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      this.receptionService.listReceptions().subscribe(
        (data: Reception[]) => {
          this.totalAcceptedBalesOfYear = data
            .filter(reception => new Date(reception.date).getFullYear() === currentYear)
            .reduce((total, reception) => total + reception.acceptedBales, 0);
        }
      )
    }

    getTotalRejectedBalesOfYear(): void {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      this.receptionService.listReceptions().subscribe(
        (data: Reception[]) => {
          this.totalRejectedBalesOfYear = data
            .filter(reception => new Date(reception.date).getFullYear() === currentYear)
            .reduce((total, reception) => total + reception.rejectedBales, 0);
        }
      )
    }
}
