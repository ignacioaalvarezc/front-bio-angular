import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-responsibles',
  templateUrl: './add-responsibles.component.html',
  styleUrls: ['./add-responsibles.component.scss']
})
export class AddResponsiblesComponent implements OnInit {

  public responsible = {
    name: '',
    email: '',
  }

  constructor(private responsibleService:ResponsibleService,
              private snack:MatSnackBar,
              private location:Location,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log(this.responsible);
    const requiredFields: Array<keyof typeof this.responsible> = ['name', 'email'];
    const fieldNames = {
      name: 'nombre',
      email: 'email'
    }
    for (const field of requiredFields) {
      if (!this.responsible[field] || (typeof this.responsible[field] === 'string' && this.responsible[field].trim() === '')) {
        this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
          duration : 3000,
          verticalPosition: 'top',
          horizontalPosition : 'right',
        });
        return;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.responsible.email)) {
      this.snack.open('Por favor, ingrese un correo electrónico válido.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    };
    Swal.fire({
      title: 'Confirmar registro',
      text: '¿Estás seguro de que quieres registrar a este operador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsibleService.addResponsible(this.responsible).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Operador guardado', 'Operador registrado con éxito', 'success').then(() => {
              this.router.navigate(['admin/view-responsibles']);
            });
          },
          (error) => {
            console.log(error);
            this.snack.open('Ha ocurrido un error en el sistema', 'Aceptar', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  goBack(): void {
    this.location.back();
  }  
}
