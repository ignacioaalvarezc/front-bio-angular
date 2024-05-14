import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartType } from 'chart.js';
import { Reception } from 'src/app/models/reception/reception';
import { ReceptionService } from 'src/app/services/reception/reception.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit{

  public chart: Chart;

  constructor(private receptionService:ReceptionService) { }

  ngOnInit(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // Make the request to get reception data
    this.receptionService.listReceptions().subscribe(
      (data: Reception[]) => {
        const dataForCurrentYear = data.filter(reception => {
          const receptionDate = new Date(reception.date);
          return receptionDate.getFullYear() === currentYear;
        });
        const chartData = this.prepareChartData(data);
        this.renderChart(chartData);
    });
  }

  prepareChartData(data: Reception[]): any {
    // Process the data for the chart
    const datasets = [{
      label: 'Fardos aceptados',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1
    }, {
      label: 'Fardos rechazados',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    }];

    data.forEach(item => {
      const monthIndex = new Date(item.date).getMonth();
      datasets[0].data[monthIndex] = (datasets[0].data[monthIndex] || 0) + item.acceptedBales;
      datasets[1].data[monthIndex] = (datasets[1].data[monthIndex] || 0) + item.rejectedBales;
    });

    return {
      labels: this.getMonthNames(),
      datasets: datasets
    };
  }

  getMonthNames(): string[] {
    return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
            'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  }

  renderChart(chartData: any): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const titleText = `Fardos aceptados y rechazados durante el año ${currentYear}`;
    // Create the chart with the processed data
    this.chart = new Chart("chart", {
      type: 'bar' as ChartType,
      data: chartData,
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

