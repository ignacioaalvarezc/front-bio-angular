import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CutTypeService {

  constructor(private http:HttpClient) { }

  public listCutTypes() {
    return this.http.get(`${baserUrl}/cutTypes/`);
  }

  public saveCutTypes(cutType: any) {
    return this.http.post(`${baserUrl}/cutTypes/`, cutType);
  } 

  public getCutType(cutTypeId:any) {
    return this.http.get(`${baserUrl}/cutTypes/id/${cutTypeId}`);
  }

  public updateCutType(cutTypeId:any, cutType: any): Observable<any> {
    return this.http.put(`${baserUrl}/cutTypes/update/${cutTypeId}`, cutType);
  }

  public deleteCutType(cutTypeId:any) {
    return this.http.delete(`${baserUrl}/cutTypes/${cutTypeId}`);
  }

  getMiniCutFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cutTypes/mini-factor/`);
  }

  getStandardCutFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cutTypes/standard-factor/`);
  }

  getBiggyCutFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cutTypes/biggy-factor/`);
  }
}
