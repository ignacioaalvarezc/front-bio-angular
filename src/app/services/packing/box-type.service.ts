import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxTypeService {

  constructor(private http:HttpClient) { }

  public listBoxTypes() {
    return this.http.get(`${baserUrl}/boxTypes/`);
  }

  public getBoxType(boxTypeId:any) {
    return this.http.get(`${baserUrl}/boxTypes/id/${boxTypeId}`);
  }

  public addBoxType(boxType:any) {
    return this.http.post(`${baserUrl}/boxTypes/`, boxType)
  }

  public updateBoxType(boxTypeId: any, boxType: any): Observable<any> {
    return this.http.put(`${baserUrl}/boxTypes/update/${boxTypeId}`, boxType);
  }

  public deleteBoxType(boxTypeId:any) {
    return this.http.delete(`${baserUrl}/boxTypes/${boxTypeId}`);
  }

  public toggleBoxTypeStatus(boxTypeId: any, newStatus: boolean): Observable<any> {
    return this.http.put(`${baserUrl}/boxTypes/toggle-status/${boxTypeId}`, { enabled: newStatus });
  }

}
