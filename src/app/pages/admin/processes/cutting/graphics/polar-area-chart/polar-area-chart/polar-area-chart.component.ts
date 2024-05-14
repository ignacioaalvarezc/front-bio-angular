import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { CutBox } from 'src/app/models/cutting/cutBox';
import { CutBoxService } from 'src/app/services/cutting/cut-box.service';
import { CuttingService } from 'src/app/services/cutting/cutting.service';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.scss']
})
export class PolarAreaChartComponent implements OnInit{

  public polarChart: Chart;
  public miniCutsAmount: number;
  public standardCutsAmount: number;
  public biggyCutsAmount: number;

  constructor(private cutBoxService:CutBoxService) { }

  ngOnInit(): void {
    this.cutBoxService.getTotalAmountForMiniCuts().subscribe(
      (miniCuts: number) => {
        this.miniCutsAmount = miniCuts;
        this.cutBoxService.getTotalAmountForStandardCuts().subscribe(
          (standardCuts: number) => {
            this.standardCutsAmount = standardCuts;
            this.cutBoxService.getTotalAmountForBiggyCuts().subscribe(
              (biggyCuts: number) => {
                this.biggyCutsAmount = biggyCuts;
                this.createPieChart(this.miniCutsAmount, this.standardCutsAmount, this.biggyCutsAmount);
              },
              error => {
                console.error('Error al obtener la cantidad de cortes Biggy', error);
              }
            );
          },
          error => {
            console.error('Error al obtener la cantidad de cortes Standard', error);
          }
        );
      },
      error => {
        console.error('Error al obtener la cantidad de cortes Mini', error);
      }
    );
  }

  createPieChart(miniCutsAmount: number, standardCutsAmount: number, biggyCutsAmount: number): void {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const data = {
      labels: ['Mini Cuts', 'Standard Cuts', 'Biggy Cuts'],
      datasets: [{
        label: 'Cantidad de cortes:',
        data: [miniCutsAmount, standardCutsAmount, biggyCutsAmount],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)'
        ],
        hoverOffset: 4
      }]
    };

    const titleText = `Total de cortes por tipo en ${currentMonth} del ${currentYear}`;
    this.polarChart = new Chart('polarChart', {
      type: 'pie' as ChartType,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: titleText,
            align: 'start',
            padding: {
              bottom: 30
            }
          },
          legend: {
            position: 'right',
            align: 'center'
          }
        }
      }
    });
  }
}
