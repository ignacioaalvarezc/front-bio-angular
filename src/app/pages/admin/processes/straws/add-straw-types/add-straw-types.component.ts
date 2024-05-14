import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-straw-types',
  templateUrl: './add-straw-types.component.html',
  styleUrls: ['./add-straw-types.component.scss']
})
export class AddStrawTypesComponent implements OnInit {

  
  constructor(private strawService:StrawService,
              private snack:MatSnackBar,
              private location:Location,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private dialogRef:MatDialogRef<AddStrawTypesComponent>) { }

  strawType: any = [] = [];

  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log(this.strawType);
    const requiredFields: Array<keyof typeof this.strawType> = ['name', 'description'];
    const fieldNames = {
      name: 'nombre',
      description: 'description'
    }
    for (const field of requiredFields) {
      if (!this.strawType[field] || (typeof this.strawType[field] === 'string' && this.strawType[field].trim() === '')) {
        this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
          duration : 3000,
          verticalPosition: 'top',
          horizontalPosition : 'right',
        });
        return;
      }
    }
    const name = this.strawType.name;
    Swal.fire({
      title: 'Confirmar registro',
      text: `¿Estás seguro de que quieres registrar el tipo de bíombilla ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.strawService.addStrawType(this.strawType).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', `El tipo de bíombilla ${name} ha sido registrado con éxito`, 'success').then(() => {
              this.dialogRef.close();
              this.cdr.detectChanges();
            });
          },
          (error) => {
            Swal.fire('Error', `Error al registrar el tipo de bíombilla ${name}.`, 'error');
          }
        );
      }
    });
  }

  goBack(): void {
    this.dialogRef.close();
  }  

}
