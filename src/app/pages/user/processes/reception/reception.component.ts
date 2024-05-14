import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Responsible } from 'src/app/models/responsible';
import { Reception } from 'src/app/models/reception/reception';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
  providers: [DatePipe]
})

export class ReceptionComponent implements OnInit {
  selectedHour: string = null;
  constructor(private responsibleService:ResponsibleService,
              private receptionService:ReceptionService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router,
              private datePipe:DatePipe) {
                
  }  


selectedDate: Date = new Date();
responsibles: any = [] = [];
newId: string;
receptionData = {
  receptionId: '',
  responsible: {
    responsibleId: '',
    name: ''
  },
  date: '',
  hour: '',
  acceptedBales: '',
  rejectedBales: '',
  reasonRejected: '',
}

ngOnInit(): void {
  this.generateUniqueId();
  this.loadResponsibles();
  
}

loadResponsibles() {
  this.responsibleService.listResponsibles().subscribe(
    (data:any) => {
      this.responsibles = data;
    }, (error) => {
      console.log(error);
      Swal.fire({
        title: 'Error', 
        text: 'Error al cargar los responsables', 
        icon: 'error'
      });
    }
  );
}

private padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

generateUniqueId() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = this.padZero(now.getMonth() + 1);
  const day = this.padZero(now.getDate());
  const hours = this.padZero(now.getHours());
  const minutes = this.padZero(now.getMinutes());
  this.newId = `${year}${month}${day}${hours}${minutes}`;
  this.receptionData.receptionId = this.newId;
  console.log(this.newId);
  console.log(this.receptionData.receptionId);
}

/*

calculateTotalHours(startHour: string, endHour: string): number {
  const startTimeParts = startHour.split(':').map(part => parseInt(part, 10));
  const endTimeParts = endHour.split(':').map(part => parseInt(part, 10));
  const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
  const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
  const totalMinutes = endMinutes - startMinutes;

  const totalHours = totalMinutes / 60;
  return totalHours;
}
*/



goBack(): void {
  this.location.back();
}

formatInitDate(): void {
  this.selectedDate = new Date();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  this.selectedHour = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
}

formatSaveDate(): void {
  const selectedDateWithTime = new Date(this.selectedDate);
  selectedDateWithTime.setHours(Number(this.selectedHour.split(':')[0]));
  selectedDateWithTime.setMinutes(Number(this.selectedHour.split(':')[1]));
  selectedDateWithTime.setMinutes(selectedDateWithTime.getMinutes() - selectedDateWithTime.getTimezoneOffset());
  console.log(this.receptionData);
  if (isNaN(selectedDateWithTime.getTime())) {
    console.error('La fecha no es válida');
    return;
  }
  this.receptionData.date = selectedDateWithTime.toISOString().split('T')[0];
}


saveReception() {

  if (!this.receptionData.responsible.responsibleId) {
    this.snack.open('Ingrese el operador a cargo.', 'Aceptar', {
      duration: 5000,
    });
    return; 
  }
  if (!this.selectedHour) {
    this.snack.open('Ingrese la hora de inicio.', 'Aceptar', {
      duration: 5000,
    });
    return; 
  }
  if (!this.receptionData.acceptedBales) {
    this.snack.open('Ingrese la cantidad de fardos aceptados.', 'Aceptar', {
      duration: 5000
    });
    return;
  }
  const accepted = this.receptionData.acceptedBales;
  const rejected = this.receptionData.rejectedBales;
  const startTime = this.selectedHour;
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const endTime = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
  const selectedResponsible = this.responsibles.find(responsible => responsible.responsibleId === this.receptionData.responsible.responsibleId);

console.log('Selected Responsible:', selectedResponsible);

if (selectedResponsible) {
  this.receptionData.responsible = {
    responsibleId: selectedResponsible.responsibleId,
    name: selectedResponsible.name
  };
}
  Swal.fire({
    title: 'Confirmar registro',
    text: `Estas registrando ${accepted} fardos aceptados y ${rejected} fardos rechazados bajo el operador ${selectedResponsible.name}. Desde las ${startTime} hasta las ${endTime}.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Registrar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if(result.isConfirmed) {
    this.formatSaveDate();
    this.receptionData.date = this.datePipe.transform(this.receptionData.date, 'yyyy-MM-dd');
    // GET THE GENERATED ID TO RECEPTION ID
    this.receptionData.receptionId = this.newId;
    /*
    // GET THE SELECTED HOUR TO START TIME
    this.receptionData.startTime = this.selectedHour;
    // GET CURRENT TIME TO END TIME
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const endTime = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
    this.receptionData.endTime = endTime;
    // CALCULATE TOTAL HOURS BETWEEN START HOOUR AND END HOUR
    const totalHoursString = this.calculateTotalHours(this.receptionData.startTime, endTime).toFixed(2);
    this.receptionData.totalHours = parseFloat(totalHoursString);   
    */
   // GET THE SELECTED HOUR TO RECEPTIONDATA.HOUR
   this.receptionData.hour = this.selectedHour;
    this.receptionService.saveReception(this.receptionData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          title: 'Éxito', 
          text: 'La recepción ha sido registrada correctamente', 
          icon: 'success'
        });
        this.router.navigate(['/user-dashboard/user-welcome']);
      },
      (error) => {
        Swal.fire({
          title: 'Error', 
          text: 'Error al registrar el proceso de recpción', 
          icon: 'error'
        });
        })
      }
    })
  }
}
