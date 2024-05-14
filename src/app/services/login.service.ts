import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable, Subject, filter, forkJoin, switchMap, take } from 'rxjs';
import Swal from 'sweetalert2';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubject = new Subject<boolean>();
  
  constructor(private http:HttpClient,
              private zone: NgZone,
              private router:Router) { }

  // GENERANDO EL TOKEN.
  public generateToken(loginData:any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  public getCurrentUser() {
    return this.http.get(`${baserUrl}/current-user`);
  }

  // INICIAR SESION GUARDANDO EL TOKEN EN EL LOCALSTORAGE.
  public loginUser(token:any) {
    localStorage.setItem('token', token);
    this.zone.run(() => {});
    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // CIERRA SESIÓN Y BORRA EL TOKEN DEL LOCALSTORAGE.
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/admin']);
    return true;
  }

  // OBTIENE EL TOKEN.
  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user:any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if(userStr != null) {
      return JSON.parse(userStr)
    } else {
      this.logout();
      return null;
    }
  }

  // OBTIENE EL ROL DEL USUARIO.
  public getUserRole(): string | null {
    let user = this.getUser();
    return user ? user.authorities[0].authority : null;
  }

  private handleLoginResponse(response: any) {
    if(response instanceof HttpErrorResponse) {
      if(response.status === 401 && response.error === 'Usuario deshabilitado') {
        Swal.fire('Usuario bloqueado', 'Su cuenta ha sido deshabilitada. Comuniquese con soporte para mas información.', 'error');
      } else {
        Swal.fire('Error de autenticación', 'Credenciales inválidas', 'error');
      }
    } else {
      this.loginUser(response.token);
      this.loginStatusSubject.next(true);
      Swal.fire('Inicio de sesión exitoso', '¡Bienvenido!', 'success');
    }
  }  
}
