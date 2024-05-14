import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CuttingService } from 'src/app/services/cutting/cutting.service';
import { ParameterService } from 'src/app/services/processes/parameter.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cuttings',
  templateUrl: './add-cuttings.component.html',
  styleUrls: ['./add-cuttings.component.scss'],
  providers: [DatePipe]
})
export class AddCuttingsComponent implements OnInit{

  selectedHour: string = '00:00';
  
  constructor(private responsibleService:ResponsibleService,
              private cuttingService:CuttingService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router,
              private datePipe:DatePipe,
              private parameterService:ParameterService,
              private strawService:StrawService) { }

  selectedDate: Date = new Date();
  cutFactor: number;
            
  responsibles: any = [];
  strawTypes: any = [];
  cuttingData = {
    responsible: {
      responsibleId: '',
      name: ''
    },
    strawType: {
      strawTypeId: '',
      name: ''
    },
    date: '',
    hour: '',
    totalWeight: '',
    strawAmount: ''
  }

  ngOnInit(): void {
    this.parameterService.getCutFactor().subscribe(
      factor => {
        this.cutFactor = factor;
        console.log(this.cutFactor)
      },
      error => {
        console.error('Error al obtener el factor de corte', error);
      }
    );
    this.selectedDate = new Date();
    this.responsibleService.listResponsibles().subscribe(
      (data:any) => {
        this.responsibles = data;
        console.log(this.responsibles);
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los responsables', 'error');
      }
    )
    this.strawService.listStrawTypes().subscribe(
      (data:any) => {
        this.strawTypes = data;
        console.log(this.strawTypes);
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los tipos de bíombilla.', 'error');
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  calculateTotals(): void {
    if (this.cuttingData.totalWeight !== '') {
      const total = parseFloat(this.cuttingData.totalWeight) / this.cutFactor;
      this.cuttingData.strawAmount = Math.round(total).toString();
    }
  }

  roundToNearest(value: number):
  number {
    return Math.round(value);
  }

  saveCutting() {
    const weight = this.cuttingData.totalWeight;
    const type = this.cuttingData.strawType;
    Swal.fire({
      title: 'Confirmar registro',
      text: `Estas registrando ${weight}g de peso ${type}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed) {
        const selectedDateWithTime = new Date(this.selectedDate);
        selectedDateWithTime.setHours(Number(this.selectedHour.split(':')[0]));
        selectedDateWithTime.setMinutes(Number(this.selectedHour.split(':')[1]));
        selectedDateWithTime.setMinutes(selectedDateWithTime.getMinutes() - selectedDateWithTime.getTimezoneOffset());
        console.log(this.cuttingData);
        if (isNaN(selectedDateWithTime.getTime())) {
          console.error('La fecha no es válida');
          return;
        }
        const newDate = new Date(selectedDateWithTime);
        newDate.setDate(newDate.getDate() + 1);
        this.cuttingData.date = newDate.toISOString().split('T')[0];
        this.cuttingData.hour = this.selectedHour;
        if(this.cuttingData.responsible == null) {
          this.snack.open('El responsable es requerido', 'Aceptar', {
            duration: 3000
          });
          return;
        }
        this.calculateTotals();
        this.cuttingData.date = this.datePipe.transform(this.cuttingData.date, 'yyyy-MM-dd');
        this.cuttingService.saveCutting(this.cuttingData).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Corte de nudos registrado con éxito', 'El proceso de corte de nudos ha sido guardado con éxito', 'success');
            this.cuttingData = {
              responsible: {
                responsibleId: '',
                name: ''
              },
              strawType: {
                strawTypeId: '',
                name: ''
              },
              date: '',
              hour: '',
              totalWeight: '',
              strawAmount: ''
            };
            this.router.navigate(['/admin/view-cuttings'])
          },
          (error) => {
            Swal.fire('Error', 'Error al registrar el proceso de corte de nudos', 'error');
          });
      }
    });   
  }





}
