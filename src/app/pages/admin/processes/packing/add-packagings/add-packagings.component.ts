import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import { PackagingService } from 'src/app/services/packing/packaging.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-packagings',
  templateUrl: './add-packagings.component.html',
  styleUrls: ['./add-packagings.component.scss'],
  providers: [DatePipe]
})
export class AddPackagingsComponent implements OnInit {
  selectedHour: string = '00:00';
  constructor(private responsibleService:ResponsibleService,
              private packagingService:PackagingService,
              private boxTypeService:BoxTypeService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router,
              private datePipe:DatePipe) { }

  selectedDate: Date = new Date();
  responsibles:any = [];
  boxTypes: any = [];
  packagingData = {
    responsible: {
      responsibleId: '',
      name: '',
    },
    boxType: {
      boxTypeId: '',
      name: '',
      provider: '',
      format: '',
      strawAmount: '',
    },
    date: '',
    hour: '',
    numberOfPackages: '',
    numberOfStraws: '',
    weightRejected: '',
    numberOfRejected: ''
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
    this.boxTypeService.listBoxTypes().subscribe(
      (data:any) => {
        this.boxTypes = data;
        console.log(this.boxTypes);
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los tipos de empaquetado', 'error');
      }
    )
  }

  

  goBack(): void {
    this.location.back();
  }

  savePackaging() {
    Swal.fire({
      title: 'Confirmar registro',
      text: `Estas seguro de que quieres registrar este empaquetado?.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed) {
        if (this.packagingData.numberOfPackages !== '') {
          const totalStraws= Number(this.packagingData.numberOfPackages) * Number(this.packagingData.boxType.strawAmount);
          this.packagingData.numberOfStraws = Math.round(totalStraws).toString();
        }
        const selectedDateWithTime = new Date(this.selectedDate);
        selectedDateWithTime.setHours(Number(this.selectedHour.split(':')[0]));
        selectedDateWithTime.setMinutes(Number(this.selectedHour.split(':')[1]));
        selectedDateWithTime.setMinutes(selectedDateWithTime.getMinutes() - selectedDateWithTime.getTimezoneOffset());
        console.log(this.packagingData);
        if (isNaN(selectedDateWithTime.getTime())) {
          console.error('La fecha no es válida');
          return;
        }
        const newDate = new Date(selectedDateWithTime);
        newDate.setDate(newDate.getDate() + 1);
        this.packagingData.date = newDate.toISOString().split('T')[0];
        this.packagingData.hour = this.selectedHour;
        if(this.packagingData.responsible == null) {
          this.snack.open('El responsable es requerido', 'Aceptar', {
            duration: 3000
          });
          return;
        }
        this.packagingData.date = this.datePipe.transform(this.packagingData.date, 'yyyy-MM-dd');
        this.packagingService.savePackaging(this.packagingData).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Éxito', 'El empaquetado ha sido guardado correctamente', 'success');
          this.packagingData = {
            responsible: {
              responsibleId: '',
              name: '',
            },
            boxType: {
              boxTypeId: '',
              name: '',
              provider: '',
              format: '',
              strawAmount: ''
            },
            date: '',
            hour: '',
            numberOfPackages: '',
            numberOfStraws: '',
            weightRejected: '',
            numberOfRejected: ''
          };
          this.router.navigate(['/admin/view-packagings/'])
        },
        (error) => {
          Swal.fire('Error', 'Error al registrar el proceso de empaquetado', 'error');
        }
      )
    }
  })
}

}
