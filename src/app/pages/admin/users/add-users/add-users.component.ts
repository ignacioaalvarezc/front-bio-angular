import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import baserUrl from 'src/app/services/helper';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    confirmPassword: '',
    name : '',
    email : '',
    phoneNumber : '',
    role: ''
  }

  hidePassword = true;
  hideConfirmPassword = true;

  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;

  roles: string[] = ['Admin', 'Usuario'];
  selectedRole: string | null = null;


  constructor(private userService:UserService,
              private snack:MatSnackBar,
              private location:Location,
              private router:Router) { }

  ngOnInit(): void {

  }

  formSubmit(){
    const requiredFields: Array<keyof typeof this.user> = ['username', 'password', 'name', 'email'];
    const fieldNames = {
      username: 'nombre de usuario',
      password: 'contraseña',
      name: 'nombre',
      email: 'correo electronico',
    }

    for (const field of requiredFields) {
      if (!this.user[field] || (typeof this.user[field] === 'string' && this.user[field].trim() === '')) {
        this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
          duration : 3000,
          verticalPosition: 'top',
          horizontalPosition : 'right',
        });
        return;
      }
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordsDoNotMatch = true;
      this.snack.open('Las contraseñas no coinciden.', 'Aceptar', { // Mostrar mensaje aquí
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    } else {
      this.passwordsDoNotMatch = false;
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
    const name = this.user.name;
    const saveMethod = this.selectedRole === 'Admin' ? 'saveAdmin' : 'addUser';
    Swal.fire({
      title: 'Confirmar registro',
      text: `¿Estás seguro de que quieres registrar al usuario ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedRole = this.user.role;
        this.userService[saveMethod](this.user).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Usuario guardado', `Usuario ${name} registrado con éxito`, 'success').then(() => {
              this.router.navigate(['admin/view-users']);
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

  togglePasswordVisibility(input: HTMLInputElement): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.hidePassword = !this.hidePassword;
  }

  togglePasswordConfirmVisibility(input: HTMLInputElement): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }





}
