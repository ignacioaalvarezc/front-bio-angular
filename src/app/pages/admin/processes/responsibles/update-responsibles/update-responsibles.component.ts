import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-responsibles',
  templateUrl: './update-responsibles.component.html',
  styleUrls: ['./update-responsibles.component.scss']
})
export class UpdateResponsiblesComponent implements OnInit{

  responsibleId: any;
  responsible: any = {};

  constructor(private route:ActivatedRoute,
              private responsibleService:ResponsibleService,
              private router:Router,
              private location:Location,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.responsibleId = this.route.snapshot.paramMap.get('responsibleId');
    this.responsible = {
      name: '',
      email: '',
    };
    this.responsibleService.getResponsible(this.responsibleId).subscribe(
      (data: any) => {
      this.responsible = data;
      console.log(this.responsible);
    },
    (error) => {
      console.log(error);
    });
  }

  updateResponsible() {
    const name = this.responsible.name;
    const requiredFields: Array<keyof typeof this.responsible> = ['name', 'email'];
    const fieldNames = {
      name: 'nombre',
      email: 'correo electrónico',
    }
    
    for (const field of requiredFields) {
      if (!this.responsible[field] || (typeof this.responsible[field] === 'string' && this.responsible[field].trim() === '')) {
        this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
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
      title: 'Confirmar actualización',
      text: `¿Estás seguro de que quieres actualizar el operador a ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsibleService.updateResponsible(this.responsibleId, this.responsible).subscribe(
          (data) => {
            console.log(data);
            Swal.fire(`Éxito`, `El operador ${name} ha sido actualizado correctamente.`, 'success').then(() => {
  
            });
          },
          (error) => {
            Swal.fire('Error', 'El operador no ha sido actualizado correctamente', 'error').then(
              (e) => {
                console.log(e);
              }
          );
        }
      );
    }
  });
}

  goBack(): void {
    this.location.back();
  }  

  toggleResponsibleStatus(responsibleId: any, newStatus: boolean, name: any) {
    const actionText1 = newStatus ? 'desbloquear' : 'bloquear';
    const actionText2 = newStatus ? 'desbloqueado' : 'bloqueado';
  
    Swal.fire({
      title: `Cambio de estado`,
      text: `¿Estás seguro de que quieres ${actionText1} al operador ${name}?. No podra ser asignado a ningún proceso.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.responsibleService.toggleResponsibleStatus(responsibleId, newStatus).subscribe(() => {
            Swal.fire('Éxito', `El operador ${name} ha sido ${actionText2} correctamente.`, 'success').then(() => {
              this.router.navigate(['admin/view-responsibles']);
            });
          },
          (error) => {
            Swal.fire('Error', `El operador ${name} no ha sido ${actionText2}`, 'error').then(
              (e) => {
                console.log(e);
              }
            );
          }
        );
      }
    });
  }

  deleteResponsible(responsibleId:any, name:any) {
    Swal.fire({
      title: `Eliminar`,
      text: `¿Estas seguro que deseas eliminar al operador ${name}?`,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.responsibleService.deleteResponsible(responsibleId).subscribe(
          (data) => {
            this.responsible = {};
            Swal.fire({
              title: 'Éxito',
              text: `El operador ${name} ha sido eliminado correctamente.`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['admin/view-responsibles']);
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar al operador.', 'error');
          }
        )
      }
    })
  }

}

