import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ParameterService } from 'src/app/services/processes/parameter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-parameters',
  templateUrl: './update-parameters.component.html',
  styleUrls: ['./update-parameters.component.scss']
})
export class UpdateParametersComponent implements OnInit {

  parameterId: any;
  parameter: any = {};

  constructor(private route:ActivatedRoute,
              private parameterService:ParameterService,
              private router:Router,
              private location:Location,
              private snack:MatSnackBar,
              private cdr:ChangeDetectorRef,
              private dialogRef: MatDialogRef<UpdateParametersComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.parameter = {...this.data};
    this.parameterId = this.data.parameterId;
    /*
    this.parameter = {
      name: '',
      factor: '',
      description: ''
    };*/
    this.parameterService.getParameter(this.parameterId).subscribe(
      (data: any) => {
        this.parameter = data;
        console.log(this.parameter);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      });    
  }

  updateParameter() {
    const name = this.parameter.name;
    const requiredFields: Array<keyof typeof this.parameter> = ['factor', 'description'];
    const fieldNames = {
      factor: 'factor',
      description: 'descripción'
    }

  for (const field of requiredFields) {
    if (!this.parameter[field] || (typeof this.parameter[field] === 'string' && this.parameter[field].trim() === '')) {
      this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }
  }
  Swal.fire({
    title: 'Confirmar actualización',
    text: `¿Estás seguro de que quieres actualizar el parametro ${name}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, actualizar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.parameterService.updateParameters(this.parameterId, this.parameter).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Éxito', `El parametro ${name} ha sido actualizado correctamente.`, 'success').then(() => {
            this.dialogRef.close();
            this.cdr.detectChanges();
          });
        },
        (error) => {
          Swal.fire('Error de actualización', `El parametro ${name} no ha sido actualizado`, 'error').then(
            (e) => {
              console.log(e);
            }
          );
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
