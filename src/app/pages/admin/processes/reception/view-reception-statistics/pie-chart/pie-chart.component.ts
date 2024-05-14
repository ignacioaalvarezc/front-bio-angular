import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { Reception } from 'src/app/models/reception/reception';
import { ReceptionService } from 'src/app/services/reception/reception.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  public pieChart: Chart;

  constructor(private receptionService:ReceptionService) { }


  ngOnInit(): void {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    this.receptionService.listReceptions().subscribe(
      (data: Reception[]) => {
        const dataForCurrentMonth = data.filter(reception => {
          const receptionDate = new Date(reception.date);
          return receptionDate.getMonth() + 1 === currentMonth && receptionDate.getFullYear() === currentYear;
        });

        const totalAcceptedBales = dataForCurrentMonth.reduce((total, reception) => total + reception.acceptedBales, 0);
        const totalRejectedBales = dataForCurrentMonth.reduce((total, reception) => total + reception.rejectedBales, 0);
        this.createPieChart(totalAcceptedBales, totalRejectedBales);
      },
      error => {
        console.error('Error to get the reception data', error);
      }
    );

  }

  createPieChart(totalAcceptedBales:number, totalRejectedBales:number): void {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', {month:'long'});
    const currentYear = currentDate.getFullYear();
    const data = {
      labels: ['Fardos aceptados', 'Fardos rechazados'],
      datasets: [{
        label: 'Fardos:',
        data: [totalAcceptedBales, totalRejectedBales],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        hoverOffset: 4
      }]
    };

    const titleText = `Fardos aceptados y rechazados de ${currentMonth} del ${currentYear}`;
    this.pieChart = new Chart('pieChart', {
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
