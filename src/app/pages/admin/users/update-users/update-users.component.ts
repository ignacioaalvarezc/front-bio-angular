import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.scss']
})
export class UpdateUsersComponent implements OnInit {

  userId: any;
  user: any = {};


  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private router:Router,
              private location:Location,
              private snack:MatSnackBar
              ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.user = {
      username: '',
      name: '',
      email: '',
      phoneNumber: null
    };
    this.userService.getUser(this.userId).subscribe(
      (data: any) => {
      this.user = data;
      console.log(this.user);
    },
    (error) => {
      console.log(error);
    });
  }

  updateUser() {
    const name = this.user.name;
    const requiredFields: Array<keyof typeof this.user> = ['username', 'name', 'email', 'phoneNumber'];
    const fieldNames = {
      username: 'nombre de usuario',
      name: 'nombre',
      email: 'correo electrónico',
      phoneNumber: 'número de teléfono',
    }
    
    for (const field of requiredFields) {
      if (!this.user[field] || (typeof this.user[field] === 'string' && this.user[field].trim() === '')) {
        this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        return;
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.snack.open('Por favor, ingrese un correo electrónico válido.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    };
    if (this.user.phoneNumber.toString().length !== 9) {
      this.snack.open('El número de teléfono debe tener exactamente 9 dígitos.', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    Swal.fire({
      title: 'Confirmar actualización',
      text: '¿Estás seguro de que quieres actualizar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUser(this.userId, this.user).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Usuario actualizado', 'Usuario actualizado con éxito', 'success').then(() => {
              this.router.navigate(['admin/view-users']);
            });
          },
          (error) => {
            Swal.fire('Usuario no actualizado', 'El usuario no ha sido actualizado', 'error').then(
              (e) => {
                console.log(e);
              }
          );
        }
      );
    }
  });
}


toggleUserStatus(userId: any, newStatus: boolean, name: any) {
  const actionText1 = newStatus ? 'desbloquear' : 'bloquear';
  const actionText2 = newStatus ? 'desbloqueado' : 'bloqueado';
  Swal.fire({
    title: `Cambio de estado`,
    text: `¿Estas seguro de que quieres ${actionText1} al usuario ${name}?. No podra iniciar sesión en el sistema.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if(result.isConfirmed) {
      this.userService.toggleUserStatus(userId, newStatus).subscribe(() => {
        Swal.fire({
          title: 'Éxito',
          text: `Usuario ${name} ${actionText2} con éxito`,
          icon: `success`,
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['admin/view-users']);
        });
      }, (error) => {
        console.error('Error de solicitud: ', error);
        Swal.fire({
          title: 'Error',
          text: `Error al ${actionText1} al usuario ${name}.`,
          icon: 'error',
        })
      });
    }
  });
}

  goBack(): void {
    this.location.back();
  }  

  deleteUser(userId:any, name:any) {
    Swal.fire({
      title: 'Eliminar usuario',
      text: `¿Estas seguro que deseas eliminar al usuario ${name}?`,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.userService.deleteUser(this.userId).subscribe(
          (data) => {
            this.user = {};
            Swal.fire({
              title: `Usuario ${name} eliminado con éxito`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/admin/users/id/', this.user.userId]);
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el usuario', 'error');
          }
        )
      }
    })
  }

}
