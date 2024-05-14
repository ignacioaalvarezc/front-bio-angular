import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private http:HttpClient) { }

  public getParameters() {
    return this.http.get(`${baserUrl}/parameters/`);
  }

  public getParameter(parameterId:any) {
    return this.http.get(`${baserUrl}/parameters/id/${parameterId}`);
  }

  public updateParameters(parameterId: any, parameter: any): Observable<any> {
    return this.http.put(`${baserUrl}/parameters/update/${parameterId}`, parameter)
  }

  getCutFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/parameters/cut-factor/`);
  }

  getSizedFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/parameters/sized-factor/`);
  }




}
