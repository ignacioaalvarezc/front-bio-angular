import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sanitized } from 'src/app/models/sanitized/sanitized';
import { SanitizedBox } from 'src/app/models/sanitized/sanitized-box';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import { SanitizedBoxService } from 'src/app/services/sanitized/sanitized-box.service';
import { SanitizedService } from 'src/app/services/sanitized/sanitized.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sanitized',
  templateUrl: './sanitized.component.html',
  styleUrls: ['./sanitized.component.scss'],
  providers: [DatePipe]
})
export class SanitizedComponent implements OnInit{

  selectedHour: string = '00:00';
  selectedSanitizedHour: string = '00:00';
  selectedBeginHour: string = '00:00';
  selectedEndHour: string = '00:00';

  sanitizedBoxData: SanitizedBox = {
    sanitizedBoxId: 0,
    numberBox: 0,
    strawType: { strawTypeId: 0 },
    responsible: { responsibleId: 2 },
    sanitized: { sanitizedId: 0 },
    date: new Date(),
    filterDate: new Date(),
    hourSanitized: '',
    hourDryingBegin: '',
    hourDryingEnd: '',
    hoursBetweenDryingBeginAndEnding: null,
    weightBeforeDrying: null,
    wetWeight: null,
    weightAfterDrying: null,
    weightGainPercentage: null,
    waterRetentionPercentage: null,
    observations: '',
    state: false
  }

  sanitizedBoxes: any[] = [];

  constructor(private responsibleService:ResponsibleService,
              private sanitizedService:SanitizedService,
              private boxService:SanitizedBoxService,
              private strawService:StrawService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router,
              private datePipe:DatePipe) { }

  selectedDate: Date = new Date();
  newId: string;
  responsibles: any = [];
  strawTypes: any = [];
  sanitizeds: any = [];
  state?: boolean;
  sanitizedData = {
    sanitizedId: '',
    responsible: {
      responsibleId: 0,
    },
    date: '',
    startTime: null,
    endTime: null,
    totalHours: 0,
    observations: ''
  }

  ngOnInit(): void {
    this.generateUniqueId();
    this.loadResponsibles();
    this.loadStrawTypes();
    this.sanitizedData.sanitizedId = this.newId;
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
    this.sanitizedData.sanitizedId = this.newId;
    console.log(this.newId);
    console.log(this.sanitizedData.sanitizedId);
}

// FORMATEO DE FECHA
formatInitDate(): void {
  this.selectedDate = new Date();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  this.selectedHour = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
}


 // FORMATEO DE FECHA AL GUARDAR
 formatSaveDate(): void {
  const selectedDateWithTime = new Date(this.selectedDate);
  const selectedDateWithStartTime = new Date(this.selectedDate);
  const selectedDateWithEndTime = new Date(this.selectedDate);
      selectedDateWithTime.setHours(Number(this.selectedHour.split(':')[0]));
      selectedDateWithTime.setMinutes(Number(this.selectedHour.split(':')[1]));
      selectedDateWithTime.setMinutes(selectedDateWithTime.getMinutes() - selectedDateWithTime.getTimezoneOffset());
      if (isNaN(selectedDateWithTime.getTime())) {
        console.error('La fecha no es válida');
        return;
      }
      const newDate = new Date(selectedDateWithTime);
      newDate.setDate(newDate.getDate());
      this.sanitizedData.date = newDate.toISOString().split('T')[0];
      this.sanitizedData.startTime = this.selectedHour;
      /*
      this.cutBoxData.date = newDate.toISOString().split('T')[0];
      this.cutBoxData.hour = this.selectedHour;
      */
}

// CARGA TODOS LOS OPERADORES
loadResponsibles() {
  this.responsibleService.listResponsibles().subscribe(
    (data:any) => {
      this.responsibles = data;
      console.log(this.responsibles);
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

// CARGA TODOS LOS TIPOS DE DIMENSIONADOS
loadStrawTypes() {
  this.strawService.listStrawTypes().subscribe(
    (data:any) => {
      this.strawTypes = data;
      console.log(this.strawTypes);
    }, (error) => {
      console.log(error);
      Swal.fire('Error', 'Error al cargar los tipos de dimensionados', 'error');
    }
  )
}

calculateTotalHours(startTime: string, endTime: string): number {
  const startTimeParts = startTime.split(':').map(part => parseInt(part, 10));
  const endTimeParts = endTime.split(':').map(part => parseInt(part, 10));
  const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
  const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
  const totalMinutes = endMinutes - startMinutes;

  const totalHours = totalMinutes / 60;
  return totalHours;
}

removeSanitizedBox(index: number) {
  this.sanitizedBoxes.splice(index, 1);
}



goBack(): void {
  this.location.back();
}

addObject() {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  

  // CREATE 6 SANITIZED BOXES
  const firstSanitizedBox = {
    numberBox: '01',
    strawType: { ...this.sanitizedBoxData.strawType },
    responsible: this.sanitizedBoxData.responsible,
    sanitized: this.sanitizedData.sanitizedId,
    date: this.sanitizedBoxData.date,
    filterDate: this.sanitizedBoxData.date,
    hourSanitized: this.sanitizedBoxData.hourSanitized,
    hourDryingBegin: this.sanitizedBoxData.hourDryingBegin,
    hourDryingEnd: this.sanitizedBoxData.hourDryingEnd,
    hoursBetweenDryingBeginAndEnding: this.sanitizedBoxData.hoursBetweenDryingBeginAndEnding,
    weightBeforeDrying: this.sanitizedBoxData.weightBeforeDrying,
    wetWeight: this.sanitizedBoxData.wetWeight,
    weightAfterDrying: this.sanitizedBoxData.weightAfterDrying,
    weightGainPercentage: this.sanitizedBoxData.weightGainPercentage,
    waterRetentionPercentage: this.sanitizedBoxData.waterRetentionPercentage,
    observations: this.sanitizedBoxData.observations,
    state: false

  };

  const secondSanitizedBox = {
    numberBox: '02',
    strawType: { ...this.sanitizedBoxData.strawType },
    responsible: this.sanitizedBoxData.responsible,
    sanitized: this.sanitizedData.sanitizedId,
    date: this.sanitizedBoxData.date,
    filterDate: this.sanitizedBoxData.date,
    hourSanitized: this.sanitizedBoxData.hourSanitized,
    hourDryingBegin: this.sanitizedBoxData.hourDryingBegin,
    hourDryingEnd: this.sanitizedBoxData.hourDryingEnd,
    hoursBetweenDryingBeginAndEnding: this.sanitizedBoxData.hoursBetweenDryingBeginAndEnding,
    weightBeforeDrying: this.sanitizedBoxData.weightBeforeDrying,
    wetWeight: this.sanitizedBoxData.wetWeight,
    weightAfterDrying: this.sanitizedBoxData.weightAfterDrying,
    weightGainPercentage: this.sanitizedBoxData.weightGainPercentage,
    waterRetentionPercentage: this.sanitizedBoxData.waterRetentionPercentage,
    observations: this.sanitizedBoxData.observations,
    state: false
  };

  const thirdSanitizedBox = {
    numberBox: '03',
    strawType: { ...this.sanitizedBoxData.strawType },
    responsible: this.sanitizedBoxData.responsible,
    sanitized: this.sanitizedData.sanitizedId,
    date: this.sanitizedBoxData.date,
    filterDate: this.sanitizedBoxData.date,
    hourSanitized: this.sanitizedBoxData.hourSanitized,
    hourDryingBegin: this.sanitizedBoxData.hourDryingBegin,
    hourDryingEnd: this.sanitizedBoxData.hourDryingEnd,
    hoursBetweenDryingBeginAndEnding: this.sanitizedBoxData.hoursBetweenDryingBeginAndEnding,
    weightBeforeDrying: this.sanitizedBoxData.weightBeforeDrying,
    wetWeight: this.sanitizedBoxData.wetWeight,
    weightAfterDrying: this.sanitizedBoxData.weightAfterDrying,
    weightGainPercentage: this.sanitizedBoxData.weightGainPercentage,
    waterRetentionPercentage: this.sanitizedBoxData.waterRetentionPercentage,
    observations: this.sanitizedBoxData.observations,
    state: false
  };

  const fourthSanitizedBox = {
    numberBox: '04',
    strawType: { ...this.sanitizedBoxData.strawType },
    responsible: this.sanitizedBoxData.responsible,
    sanitized: this.sanitizedData.sanitizedId,
    date: this.sanitizedBoxData.date,
    filterDate: this.sanitizedBoxData.date,
    hourSanitized: this.sanitizedBoxData.hourSanitized,
    hourDryingBegin: this.sanitizedBoxData.hourDryingBegin,
    hourDryingEnd: this.sanitizedBoxData.hourDryingEnd,
    hoursBetweenDryingBeginAndEnding: this.sanitizedBoxData.hoursBetweenDryingBeginAndEnding,
    weightBeforeDrying: this.sanitizedBoxData.weightBeforeDrying,
    wetWeight: this.sanitizedBoxData.wetWeight,
    weightAfterDrying: this.sanitizedBoxData.weightAfterDrying,
    weightGainPercentage: this.sanitizedBoxData.weightGainPercentage,
    waterRetentionPercentage: this.sanitizedBoxData.waterRetentionPercentage,
    observations: this.sanitizedBoxData.observations,
    state: false
  };

  const fifthSanitizedBox = {
    numberBox: '05',
    strawType: { ...this.sanitizedBoxData.strawType },
    responsible: this.sanitizedBoxData.responsible,
    sanitized: this.sanitizedData.sanitizedId,
    date: this.sanitizedBoxData.date,
    filterDate: this.sanitizedBoxData.date,
    hourSanitized: this.sanitizedBoxData.hourSanitized,
    hourDryingBegin: this.sanitizedBoxData.hourDryingBegin,
    hourDryingEnd: this.sanitizedBoxData.hourDryingEnd,
    hoursBetweenDryingBeginAndEnding: this.sanitizedBoxData.hoursBetweenDryingBeginAndEnding,
    weightBeforeDrying: this.sanitizedBoxData.weightBeforeDrying,
    wetWeight: this.sanitizedBoxData.wetWeight,
    weightAfterDrying: this.sanitizedBoxData.weightAfterDrying,
    weightGainPercentage: this.sanitizedBoxData.weightGainPercentage,
    waterRetentionPercentage: this.sanitizedBoxData.waterRetentionPercentage,
    observations: this.sanitizedBoxData.observations,
    state: false
  };

  const sixthSanitizedBox = {
    numberBox: '06',
    strawType: { ...this.sanitizedBoxData.strawType },
    responsible: this.sanitizedBoxData.responsible,
    sanitized: this.sanitizedData.sanitizedId,
    date: this.sanitizedBoxData.date,
    filterDate: this.sanitizedBoxData.date,
    hourSanitized: this.sanitizedBoxData.hourSanitized,
    hourDryingBegin: this.sanitizedBoxData.hourDryingBegin,
    hourDryingEnd: this.sanitizedBoxData.hourDryingEnd,
    hoursBetweenDryingBeginAndEnding: this.sanitizedBoxData.hoursBetweenDryingBeginAndEnding,
    weightBeforeDrying: this.sanitizedBoxData.weightBeforeDrying,
    wetWeight: this.sanitizedBoxData.wetWeight,
    weightAfterDrying: this.sanitizedBoxData.weightAfterDrying,
    weightGainPercentage: this.sanitizedBoxData.weightGainPercentage,
    waterRetentionPercentage: this.sanitizedBoxData.waterRetentionPercentage,
    observations: this.sanitizedBoxData.observations,
    state: false
  };

  this.sanitizedBoxes.push(firstSanitizedBox, secondSanitizedBox, thirdSanitizedBox, fourthSanitizedBox, fifthSanitizedBox, sixthSanitizedBox);
  
}

removeCutBox(index: number) {
  this.sanitizedBoxes.splice(index, 1);
}


saveBox(sanitizedBoxData: any) {
  this.boxService.saveAllSanitizedBoxes(this.sanitizedBoxes).subscribe(
    (data) => {
      this.sanitizedBoxData = (sanitizedBoxData);
    },
    (error) => {
      Swal.fire({
        title: 'Error', 
        text: 'Error al registrar las cajas de sanitizado.', 
        icon: 'error'});
      });
  }

saveSanitating() {
  Swal.fire({
    title: 'Confirmación de registro',
    text: `Estas registrando ...`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Registrar',
    cancelButtonText: 'Cancelar',})
    .then((result) => {
      if(result.isConfirmed) {
        this.formatSaveDate();
        this.sanitizedData.date = this.datePipe.transform(this.sanitizedData.date, 'yyyy-MM-dd');
        // GET THE GENERATED ID TO CUTTING ID
        this.sanitizedData.sanitizedId = this.newId;
        this.sanitizedData.responsible = this.sanitizedBoxData.responsible;
        this.sanitizedBoxData.state = false;
        // GET CURRENT TIME TO END TIME
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const endTime = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
        this.sanitizedData.endTime = endTime;
        this.sanitizedData.totalHours = this.calculateTotalHours(this.sanitizedData.startTime, endTime);
        if(this.sanitizedData.responsible == null) {
          this.snack.open('El responsable es requerido', 'Aceptar', {
            duration: 3000
          });
          return;
        }
        if(this.sanitizedBoxData.strawType == null) {
          this.snack.open('El tipo de dimensionado es requerido', 'Aceptar', {
            duration: 3000
          });
          return;
        }
        this.sanitizedService.saveSanitized(this.sanitizedData).subscribe(
          (sanitizedId: number) => {
            this.sanitizedBoxes.forEach((sanitizedBox) => {
              sanitizedBox.sanitized = sanitizedId;
            });
            this.saveBox(this.sanitizedBoxData);
            Swal.fire({
              title: 'Éxito', 
              text: 'El lote de sanitizado ha sido registrado con éxito', 
              icon: 'success'});
            },
            (error) => {
              Swal.fire({
                title: 'Error',
                text: 'Error al registrar el lote de sanitizado.',
                icon: 'error'});
              });
            }
          })
        }
      }



