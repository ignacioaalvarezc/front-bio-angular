import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ParameterService } from 'src/app/services/processes/parameter.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { SizingService } from 'src/app/services/processes/sizing.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sizings',
  templateUrl: './add-sizings.component.html',
  styleUrls: ['./add-sizings.component.scss'],
  providers: [DatePipe]
})
export class AddSizingsComponent implements OnInit {

  selectedHour: string = '00:00';
  constructor(private responsibleService:ResponsibleService,
              private sizingService:SizingService,
              private strawService:StrawService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router,
              private datePipe:DatePipe,
              private parameterService:ParameterService) { }

  selectedDate: Date = new Date();
  sizedFactor: number;

  sizings: any = [] = [];
  responsibles: any = [] = [];
  strawTypes: any = [] = [];
  sizingData = {
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
    weight: '',
    amount: '',
    observations: ''
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.parameterService.getSizedFactor().subscribe(
      factor => {
        this.sizedFactor = factor;
        console.log(this.sizedFactor)
      },
      error => {
        console.error('Error al obtener el factor de corte', error);
      }
    );
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
        Swal.fire('Error', 'Error al cargar los tipos de bíombillas.', 'error');
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  calculateTotals(): void {
    if (this.sizingData.weight !== '') {
      const total = parseFloat(this.sizingData.weight) / this.sizedFactor;
      this.sizingData.amount = Math.round(total).toString();
    }
  }

  saveSizing() {
    const weight = this.sizingData.weight;
    const amount = this.sizingData.amount;
    const responsible = this.sizingData.responsible;
    const strawType = this.sizingData.strawType;
    Swal.fire({
      title: 'Confirmación de registro',
      text: `Estas registrando un canasto de bíombillas tipo ${strawType} de ${weight}g bajo el responsable ${responsible}.`,
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
        console.log(this.sizingData);
        if (isNaN(selectedDateWithTime.getTime())) {
          console.error('La fecha no es válida');
          return;
        }
    const newDate = new Date(selectedDateWithTime);
    newDate.setDate(newDate.getDate() + 1);
    this.sizingData.date = newDate.toISOString().split('T')[0];
    this.sizingData.hour = this.selectedHour;
    if(this.sizingData.responsible == null) {
      this.snack.open('El responsable es requerido', 'Aceptar', {
        duration: 3000
      });
      return;
    }
    this.calculateTotals();
    this.sizingData.date = this.datePipe.transform(this.sizingData.date, 'yyyy-MM-dd');
    this.sizingService.saveSizing(this.sizingData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          title: 'Dimensionado registrado con éxito',
          text: 'El canasto dimensionado ha sido guardado con éxito',
          icon: 'success'});
          this.router.navigate(['admin/view-sizings']);
        this.sizingData = {
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
          weight: '',
          amount: '',
          observations: ''
        };
      },
      (error) => {
        Swal.fire('Error', 'Error al registrar el proceso de dimensionado', 'error');
      }
    )
      }
    })
  }

}
