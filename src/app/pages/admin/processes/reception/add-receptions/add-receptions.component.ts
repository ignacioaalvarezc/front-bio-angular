import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-add-receptions',
  templateUrl: './add-receptions.component.html',
  styleUrls: ['./add-receptions.component.scss'],
  providers: [DatePipe]
})
export class AddReceptionComponent implements OnInit{
  selectedStartHour: string = '00:00';
  selectedEndHour: string = '00:00';
  constructor(private responsibleService:ResponsibleService,
              private receptionService:ReceptionService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router,
              private datePipe:DatePipe) { }

    selectedDate: Date = new Date();
    responsibles:any = [];
    newId: string;
    receptionData = {
      receptionId: '',
      responsible: {
        responsibleId: ''
      },
      date: '',
      startTime: '',
      endTime: '',
      totalHours: 0,
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

    calculateTotalHours(startHour: string, endHour: string): number {
      const startTimeParts = startHour.split(':').map(part => parseInt(part, 10));
      const endTimeParts = endHour.split(':').map(part => parseInt(part, 10));
      const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
      const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
      const totalMinutes = endMinutes - startMinutes;
    
      const totalHours = totalMinutes / 60;
      return totalHours;
    }
    

    goBack(): void {
      this.location.back();
    }

    
    
    saveReception() {
        
      if (!this.receptionData.responsible.responsibleId) {
        this.snack.open('Ingrese el operador a cargo.', 'Aceptar', {
          duration: 5000
        });
        return; 
      }
      if (!this.selectedDate) {
        this.snack.open('Ingrese la fecha.', 'Aceptar', {
          duration: 5000,
        });
        return; 
      }
      if (!this.selectedStartHour) {
        this.snack.open('Ingrese la hora de inicio.', 'Aceptar', {
          duration: 5000,
        });
        return; 
      }
      if (!this.selectedEndHour) {
        this.snack.open('Ingrese la hora de termino.', 'Aceptar', {
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
      const startTime = this.selectedStartHour;
      const endTime = this.selectedEndHour;
      const selectedResponsible = this.responsibles.find(responsible => responsible.responsibleId === this.receptionData.responsible.responsibleId);
      Swal.fire({
        title: 'Confirmar registro',
        text: `Estas registrando ${accepted} fardos aceptados y ${rejected} fardos rechazados a cargo del operador ${selectedResponsible.name}. Desde las ${startTime} hasta las ${endTime}.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Registrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if(result.isConfirmed) {
          const selectedDateWithTime = new Date(this.selectedDate);
          selectedDateWithTime.setHours(Number(this.selectedStartHour.split(':')[0]));
          selectedDateWithTime.setMinutes(Number(this.selectedStartHour.split(':')[1]));
          selectedDateWithTime.setHours(Number(this.selectedEndHour.split(':')[0]));
          selectedDateWithTime.setMinutes(Number(this.selectedEndHour.split(':')[1]));
          selectedDateWithTime.setMinutes(selectedDateWithTime.getMinutes() - selectedDateWithTime.getTimezoneOffset());
          if (isNaN(selectedDateWithTime.getTime())) {
            console.error('La fecha no es válida');
            return;
          }
          const newDate = new Date(selectedDateWithTime);
          newDate.setDate(newDate.getDate() + 1);
          this.receptionData.date = newDate.toISOString().split('T')[0];
          this.receptionData.startTime = this.selectedStartHour;
          this.receptionData.endTime = this.selectedEndHour;
          const totalHoursString = this.calculateTotalHours(this.receptionData.startTime, endTime).toFixed(2);
          this.receptionData.totalHours = parseFloat(totalHoursString);   
          this.receptionData.date = this.datePipe.transform(this.receptionData.date, 'yyyy-MM-dd');
          this.receptionService.saveReception(this.receptionData).subscribe(     
          (data) => {
            console.log(data);
            Swal.fire({
              title: 'Éxito', 
              text: 'La recepción ha sido registrada correctamente.', 
              icon: 'success'
            });
            this.router.navigate(['/admin/view-receptions/'])
          },
          (error) => {
            Swal.fire({
              title: 'Error', 
              text: 'Error al registrar el proceso de recpción', 
              icon: 'error'
            });
          }
        )
      }
    })
  }
}
