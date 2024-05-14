import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  user = { 
    userId: '',
    password: ''
  };
  confirmPassword: string = '';
  userId: any;
  password: '';

  constructor(private loginService:LoginService,
              private location: Location,
              private userService:UserService,
              private snack:MatSnackBar,
              private router:Router,
              private cdr:ChangeDetectorRef,
              private dialogRef: MatDialogRef<ChangePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) private data:any) { }

ngOnInit(): void {
this.user = this.loginService.getUser();
this.user = {...this.data};
this.userId = this.data.userId;
this.userService.getUser(this.userId).subscribe(
  (data: any) => {
    this.user = data;
    console.log(this.user);
    this.cdr.detectChanges();
  },
  (error) => {
    console.log(error);
  });
  this.user.password = '';
}



 

  changePassword(): void {
  
      if (this.user.password === this.confirmPassword) {
        Swal.fire({
          title: 'Confirmación',
          text: '¿Estás seguro de que quieres cambiar tu contraseña?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si, actualizar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.updateUser(this.userId, this.user).subscribe(
              (data) => {
                console.log(data);
                Swal.fire('Contraseña actualizada', 'Contraseña actualizada con éxito', 'success').then(() => {
                  this.dialogRef.close();
                  this.cdr.detectChanges();
                });
              },
              (error) => {
                Swal.fire('Contraseña no actualizada', 'La contraseña no ha sido actualizada', 'error').then(
                  (e) => {
                    console.log(e);
                  }
              );
            }
          );
        }
      });
        console.log('Contraseñas coinciden.')
      } else {
        console.log('Las contraseñas no coinciden');
      }
    }
  }

