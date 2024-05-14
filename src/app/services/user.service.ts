import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  public listUsers() {
    return this.http.get(`${baserUrl}/users/`)
  }

  public addUser(user:any): Observable<any> {
    return this.http.post(`${baserUrl}/users/`, user);
  }

  public saveAdmin(user:any): Observable<any> {
    return this.http.post(`${baserUrl}/users/save-admin`, user);
  }

  public saveUser(user:any): Observable<any> {
    return this.http.post(`${baserUrl}/users/save-user`, user);
  }

  public getUser(userId:any): Observable<any> {
    return this.http.get(`${baserUrl}/users/id/${userId}`);
  }

  public updateUser(userId: any, user: any): Observable<any> {
    return this.http.put(`${baserUrl}/users/update/${userId}`, user);
  }

  public changePassword(userId: any, user: any): Observable<any> {
    return this.http.put(`${baserUrl}/users/change-password/${userId}`, user);
  }

  public toggleUserStatus(userId: any, newStatus: boolean): Observable<any> {
    return this.http.put(`${baserUrl}/users/toggle-status/${userId}`, { enabled: newStatus });
  }

  public deleteUser(userId:any) {
    return this.http.delete(`${baserUrl}/users/${userId}`);
  }

  validateUsername(username: string) {
    return this.http.post<any>(`${baserUrl}/users/validate-username`, username);
  }

  uploadProfilePicture(userId: number, photo: File) {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.post(`${baserUrl}/users/${userId}/photo`, formData);
  }

  getProfilePicture(userId: number) {
    return this.http.get(`${baserUrl}/users/${userId}/photo`, { responseType: 'blob' });
  }

}


