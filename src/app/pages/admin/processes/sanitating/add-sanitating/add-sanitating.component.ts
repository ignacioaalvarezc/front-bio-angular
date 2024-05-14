import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ParameterService } from 'src/app/services/processes/parameter.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sanitating',
  templateUrl: './add-sanitating.component.html',
  styleUrls: ['./add-sanitating.component.scss'],
  providers: [DatePipe]
})
export class AddSanitatingComponent {

  /*
  selectedHour: string = '00:00';
  
  constructor(private responsibleService:ResponsibleService,
              private sanitatingService:SanitatingService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router,
              private datePipe:DatePipe,
              private parameterService:ParameterService,
              private strawService:StrawService) { }

  selectedDate: Date = new Date();
  responsibles: any = [];
  strawTypes: any = [];
  sanitatingData = {
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
    weightBeforeDrying: '',
    wetWeight: '',
    weightAfterDrying: '',
    weightGainPercentage: '', //Porcentaje de aumento de peso: Fórmula: ((Peso del producto seco después de ser mojado - Peso del producto seco antes de ser mojado) / Peso del producto seco antes de ser mojado) * 100 || Esta métrica muestra el incremento porcentual del peso del producto después de ser mojado en relación con su peso original.
    waterRetentionPercentage: '', //Porcentaje de retención de agua: Fórmula: ((Peso del producto seco después de ser mojado - Peso del producto seco antes de ser mojado) / (Peso del producto seco después de ser mojado)) * 100 || Esta métrica indica qué porcentaje del peso del producto después de ser mojado está compuesto por agua.
    observations: '',
    state: '',
  }

  ngOnInit(): void {
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

  saveSanitating() {
    const wetWeight = parseFloat(this.sanitatingData.wetWeight);
    const afterWeight = parseFloat(this.sanitatingData.weightAfterDrying);
    const beforeWeight = parseFloat(this.sanitatingData.weightBeforeDrying);
    
    const weightGainPercentage = ((afterWeight - beforeWeight)/beforeWeight)*100
    const waterRetentionPercentage = ((afterWeight - beforeWeight)/afterWeight)*100
    Swal.fire({
      title: 'Confirmar registro',
      text: `Estas registrando ${beforeWeight}kg de peso anterior al mojado, ${wetWeight}kg de peso húmedo y ${afterWeight}kg de peso seco posterior al mojado.`,
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
        console.log(this.sanitatingData);
        if (isNaN(selectedDateWithTime.getTime())) {
          console.error('La fecha no es válida');
          return;
        }
        const newDate = new Date(selectedDateWithTime);
        newDate.setDate(newDate.getDate() + 1);
        this.sanitatingData.date = newDate.toISOString().split('T')[0];
        this.sanitatingData.hour = this.selectedHour;
        if(this.sanitatingData.responsible == null) {
          this.snack.open('El responsable es requerido', 'Aceptar', {
            duration: 3000
          });
          return;
        }
        this.sanitatingData.date = this.datePipe.transform(this.sanitatingData.date, 'yyyy-MM-dd');
        this.sanitatingData.weightGainPercentage = weightGainPercentage.toFixed(2);
        this.sanitatingData.waterRetentionPercentage = waterRetentionPercentage.toFixed(2);
        this.sanitatingService.saveSanitating(this.sanitatingData).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Sanitizado registrado con éxito', 'El proceso de sanitizado ha sido guardado correctamente.', 'success');
            this.sanitatingData = {
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
              weightBeforeDrying: '',
              wetWeight: '',
              weightAfterDrying: '',
              weightGainPercentage: '',
              waterRetentionPercentage: '',
              observations: '',
              state: '',
            }
            this.router.navigate(['/admin/view-sanitatings'])
          },
          (error) => {
            Swal.fire('Error', 'Error al registrar el proceso de sanitizado.', 'error');
          });
      }
    });   
  }
  */
}
