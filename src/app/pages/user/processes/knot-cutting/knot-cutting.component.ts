import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CuttingService } from 'src/app/services/cutting/cutting.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ParameterService } from 'src/app/services/processes/parameter.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import { CutTypeService } from 'src/app/services/cutting/cut-type.service';
import { CutBoxService } from 'src/app/services/cutting/cut-box.service';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { CutFactorService } from 'src/app/services/cutting/cut-factor.service';
import { CutBox } from 'src/app/models/cutting/cutBox';
import { CutType } from 'src/app/models/cutting/cutType';
import { ExtraTask } from 'src/app/models/extra-task/extraTask';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { ExtraTaskService } from 'src/app/services/activity/extra-task.service';


@Component({
  selector: 'app-knot-cutting',
  templateUrl: './knot-cutting.component.html',
  styleUrls: ['./knot-cutting.component.scss'],
  providers: [DatePipe]
})
export class KnotCuttingComponent implements OnInit {
  selectedStartTask: string = '00:00';
  selectedEndTask: string = '00:00';
  cutBoxData: CutBox = {
    cutBoxId: 0,
    amount: 0,
    cutType: { cutTypeId: 0 },
    cutting: { cuttingId: 0 },
    responsible: { responsibleId: 2 },
    date: new Date(),
    filterDate: new Date(),
    hour: new Date(),
    weight: null
    };

  
  cutBoxes: any[] = [];

  extraTaskData: ExtraTask = {
    extraTaskId: 0,
    responsible: { responsibleId: 2 },
    activity: { activityId: 0 },
    date: new Date(),
    filterDate: new Date(),
    startTaskTime: null,
    endTaskTime: null,
    totalTaskHours: null,
    };

    extraTasks: any[] = [];
  
  
  constructor(private responsibleService:ResponsibleService,
              private typeService:CutTypeService,
              private boxService:CutBoxService,
              private cuttingService:CuttingService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router,
              private datePipe:DatePipe,
              private activityService:ActivityService,
              private taskService:ExtraTaskService) { }

  selectedDate: Date = new Date();
  selectedType: any[];
  entries: any[] = [];

  newId: string;
  responsibles: any = [];
  cutTypes: any = [];
  activities: any = [];
  
  cuttings: any = [];
  cuttingData = {
    cuttingId: '',
    responsible: {
      responsibleId: 0
    },

    weight: '',
    amount: '',
    date: '',
    hour: '',
    totalHours: null,
    totalMinutes: null,
    totalWeight: '',
    totalAmount: '',
    observations: ''
  }

  miniCutType: any;
  standardCutType: any;
  biggyCutType: any;

  ngOnInit(): void {
    this.generateUniqueId();
    this.loadResponsibles();
    this.loadActivities();
    this.loadCutTypes();
    this.cuttingData.cuttingId = this.newId;
    
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
    this.cuttingData.cuttingId = this.newId;
}



  // FORMATEO DE FECHA
  formatInitDate(): void {
    this.selectedDate = new Date();
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    this.selectedStartTask = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
    this.selectedEndTask = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
  }

  // FORMATEO DE FECHA AL GUARDAR
  formatSaveDate(): void {
    const selectedDateWithTime = new Date(this.selectedDate);
    const selectedDateWithStartTime = new Date(this.selectedDate);
    const selectedDateWithEndTime = new Date(this.selectedDate);
        selectedDateWithStartTime.setHours(Number(this.selectedStartTask.split(':')[0]));
        selectedDateWithStartTime.setMinutes(Number(this.selectedStartTask.split(':')[1]));
        selectedDateWithEndTime.setHours(Number(this.selectedEndTask.split(':')[0]));
        selectedDateWithEndTime.setMinutes(Number(this.selectedEndTask.split(':')[1]));
        selectedDateWithTime.setMinutes(selectedDateWithTime.getMinutes() - selectedDateWithTime.getTimezoneOffset());
        selectedDateWithStartTime.setMinutes(selectedDateWithStartTime.getMinutes() - selectedDateWithStartTime.getTimezoneOffset());
        selectedDateWithEndTime.setMinutes(selectedDateWithEndTime.getMinutes() - selectedDateWithEndTime.getTimezoneOffset());
        if (isNaN(selectedDateWithTime.getTime() && selectedDateWithStartTime.getTime() && selectedDateWithEndTime.getTime())) {
          console.error('La fecha no es válida');
          return;
        }
        const newDate = new Date(selectedDateWithTime);
        const newDateStart = new Date(selectedDateWithStartTime);
        const newDateEnd = new Date(selectedDateWithEndTime);
        newDate.setDate(newDate.getDate());
        newDateStart.setDate(newDateStart.getDate());
        newDateEnd.setDate(newDateEnd.getDate());
        this.cuttingData.date = newDate.toISOString().split('T')[0];
        this.extraTaskData.startTaskTime = this.selectedStartTask;
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

  loadActivities() {
    this.activityService.listActivities().subscribe(
      (data:any) => {
        this.activities = data;
        console.log(this.activities);
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error', 
          text: 'Error al cargar las actividades.', 
          icon: 'error'
        });
      }
    );
  }


  // CARGA TODOS LOS TIPOS DE CORTE
  loadCutTypes() {
    this.typeService.listCutTypes().subscribe(
      (data:any) => {
        this.cutTypes = data;
        console.log(this.cutTypes);
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los tipos de bíombillas', 'error');
      }
    )
  }



  saveCutting() {
    const weight = this.cutBoxData.weight;
    const amount = this.cuttingData.totalAmount;
    Swal.fire({
      title: 'Confirmar registro',
      text: `Estas registrando:  ${weight}g. en peso de tipo ${weight}, correspondientes a ${amount} bíombillas.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed) {
        this.formatSaveDate();
        this.cuttingData.date = this.datePipe.transform(this.cuttingData.date, 'yyyy-MM-dd');
        // GET THE GENERATED ID TO CUTTING ID
        this.cuttingData.cuttingId = this.newId;
        this.cuttingData.responsible = this.cutBoxData.responsible;
        this.extraTaskData.responsible = this.cutBoxData.responsible;
        /*
        // GET CURRENT TIME TO END TIME
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const endTime = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
        this.cuttingData.endTime = endTime;
        // CALCULATE TOTAL HOURS BETWEEN START HOOUR AND END HOUR
        this.cuttingData.totalHours = this.calculateTotalHours(this.cuttingData.startTime, endTime);
        */
        // SAVES THE CUTTING DATA OBJECT
        this.cuttingService.saveCutting(this.cuttingData).subscribe(
          (cuttingId: number) => {
            this.cutBoxes.forEach((cutBox) => {
              cutBox.cutting = cuttingId;
            });
            this.saveBox(this.cutBoxData);
            //this.calculateTotalTaskHours(this.extraTaskData.startTaskTime, this.extraTaskData.endTaskTime);
            this.saveExtraTask(this.extraTaskData);
          },
          (error) => {
            Swal.fire({
              title: 'Error', 
              text: 'Error al registrar el proceso de corte de nudos.', 
              icon: 'error'});
            });
      }
    });   
  }
  
  saveBox(cutBoxData: any) {
    console.log(this.cutBoxData);
    this.boxService.saveAllCutBoxes(this.cutBoxes).subscribe(
      (data) => {
        this.cutBoxData = (cutBoxData);
        this.calculateAmount(this.cutBoxes);
        Swal.fire({
          title: 'Éxito', 
          text: 'Proceso registrado correctamente.', 
          icon: 'success'});
      },
      (error) => {
        Swal.fire({
          title: 'Error', 
          text: 'Error al registrar el proceso de corte de nudos.', 
          icon: 'error'});
        });
    }

  saveExtraTask(extraTaskData: any) {
    console.log(this.extraTaskData);
        this.extraTaskData.endTaskTime = this.selectedEndTask;
        this.extraTaskData.startTaskTime = this.selectedStartTask;
    this.taskService.saveAllExtraTasks(this.extraTasks).subscribe(
      (data) => {
        this.extraTaskData = (extraTaskData);
        //this.extraTaskData.totalTaskHours = this.calculateTotalTaskHours(this.extraTaskData.startTaskTime, this.extraTaskData.endTaskTime);
        Swal.fire({
          title: 'Éxito', 
          text: 'Proceso registrado correctamente.', 
          icon: 'success'});
      },
      (error) => {
        Swal.fire({
          title: 'Error', 
          text: 'Error al registrar el proceso de corte de nudos.', 
          icon: 'error'});
        });

  }

  

  goBack(): void {
    this.location.back();
  }

  addObjet() {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
  
    // CREATE 3 CUT BOXES
    const miniCutBox = {
      amount: this.cutBoxData.amount,
      date: this.cutBoxData.date,
      filterDate: this.cutBoxData.date,
      hour: `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`,
      weight: this.cutBoxData.weight,
      cutType: { ...this.cutTypes.find(type => type.name === 'Mini') },
      cutting: this.cuttingData.cuttingId,
      responsible: this.cutBoxData.responsible
    };
  
    const standardCutBox = {
      amount: this.cutBoxData.amount,
      date: this.cutBoxData.date,
      filterDate: this.cutBoxData.date,
      hour: `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`,
      weight: this.cutBoxData.weight,
      cutType: { ...this.cutTypes.find(type => type.name === 'Standard') },
      cutting: this.cuttingData.cuttingId,
      responsible: this.cutBoxData.responsible
    };
  
    const biggyCutBox = {
      amount: this.cutBoxData.amount,
      date: this.cutBoxData.date,
      filterDate: this.cutBoxData.date,
      hour: `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`,
      weight: this.cutBoxData.weight,
      cutType: { ...this.cutTypes.find(type => type.name === 'Biggy') },
      cutting: this.cuttingData.cuttingId,
      responsible: this.cutBoxData.responsible
    };

    this.cutBoxes.push(miniCutBox, standardCutBox, biggyCutBox);
    
  }

  removeCutBox(index: number) {
    this.cutBoxes.splice(index, 1);
  }
  
  

addObjetTask() {
  this.extraTasks.push
    ({
      responsible: this.cutBoxData.responsible,
      activity: { ...this.extraTaskData.activity },
      date: this.extraTaskData.date,
      filterDate: this.extraTaskData.date,
      startTaskTime: this.extraTaskData.startTaskTime,
      endTaskTime: this.extraTaskData.endTaskTime,
      totalTaskHours: this.extraTaskData.totalTaskHours
    });
}

removeExtraTasks(index: number) {
  this.extraTasks.splice(index, 1);
}


/*
calculateTotalHours(startTime: string, endTime: string): number {
  const startTimeParts = startTime.split(':').map(part => parseInt(part, 10));
  const endTimeParts = endTime.split(':').map(part => parseInt(part, 10));
  const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
  const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
  const totalMinutes = endMinutes - startMinutes;

  const totalHours = totalMinutes / 60;
  return totalHours;
}
*/

calculateTotalTaskHours(startTaskTime: string, endTaskTime: string): number {
  const startTaskTimeParts = startTaskTime.split(':').map(part => parseInt(part, 10));
  const endTaskTimeParts = endTaskTime.split(':').map(part => parseInt(part, 10));
  const startTaskMinutes = startTaskTimeParts[0] * 60 + startTaskTimeParts[1];
  const endTaskMinutes = endTaskTimeParts[0] * 60 + endTaskTimeParts[1];
  const totalTaskMinutes = endTaskMinutes - startTaskMinutes;

  const totalTaskHours = totalTaskMinutes / 60;
  return totalTaskHours;
}





calculateAmount(cutBox: any) {
  const selectedCutType = this.cutTypes.find(type => type.cutTypeId === cutBox.cutType.cutTypeId);
  console.log("Este es el selectedCutType: ", selectedCutType)
  if (selectedCutType && cutBox.weight) {
    console.log("Este es el peso: ", cutBox.weight);
    cutBox.amount = selectedCutType.factor * cutBox.weight;
  } else {
    console.error('Tipo de corte no encontrado o peso no definido');
  }
}


}

