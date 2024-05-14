import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityItemService {

  constructor(private http:HttpClient) { }

  public listSecurityItems() {
    return this.http.get(`${baserUrl}/securityItems/`);
  }

  public saveSecurityItem(securityItem:any) {
    return this.http.post(`${baserUrl}/securityItems/`, securityItem);
  }

  public getSecurityItem(securityItemId:any) {
    return this.http.get(`${baserUrl}/securityItems/id/${securityItemId}`);
  }

  public updateSecurityItem(securityItemId:any, securityItem: any): Observable<any> {
    return this.http.put(`${baserUrl}/securityItems/update/${securityItemId}`, securityItem);
  }

  public deleteSecurityItem(securityItem:any) {
    return this.http.delete(`${baserUrl}/securityItems/${securityItem}`);
  }
}
