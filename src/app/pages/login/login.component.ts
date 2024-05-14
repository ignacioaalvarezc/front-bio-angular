import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username" : '',
    "password" : ''
  }
  user: any = new Object();
  hidePassword = true;

  constructor(private snack:MatSnackBar, 
              public login:LoginService,
              private router:Router) { }

  ngOnInit(): void {
    this.login.getCurrentUser().subscribe((user: any) => {
      this.user = user; // UPDATE THE USER VARIABLE WHEN THE USER CHANGES
    });

  }

  formSubmit() {
    if(this.loginData.username.trim() === '' || this.loginData.username.trim() == null) {
      this.snack.open('El nombre de usuario es requerido.', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if(this.loginData.password.trim() === '' || this.loginData.password.trim() == null) {
      this.snack.open('La contraseña es requerida.', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user:any) => {
          this.login.setUser(user);
          console.log(user);

          if (this.login.getUserRole() == "ADMIN") {
            // DASHBOARD ADMIN
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
            window.location.reload();
          } else if (this.login.getUserRole() == "USER") {
              // USER DASHBOARD
              this.router.navigate(['user-dashboard/user-welcome']);
              this.login.loginStatusSubject.next(true);
              window.location.reload();
          } else {
            this.login.logout();
          }
        });
      }, (error) => {
        console.log(error);
        if(error.status === 401) {
          // BLOCKED USER
          this.showSwalError('El usuario esta bloqueado. Comuniquese con soporte para mas información');
        } else {
          this.showSwalError('Nombre de usuario o contraseña incorrectos');
        }
      }
    );
  }

  private showSwalError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error de inicio de sesion',
      text: message
    });
  }

   // CHECK IF THE CURRENT PAGE IS THE LOGIN PAGE
   isLoginPage(): boolean {
    return this.router.url.includes('/');
  }

  // LOGOUT FUNCTION
  public logout(){
    this.login.logout(); // CALL THE LOGOUT METHOD FROM THE LOGIN SERVICE
    window.location.reload();
  }

  togglePasswordVisibility(input: HTMLInputElement): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.hidePassword = !this.hidePassword;
  }
  
}




 
