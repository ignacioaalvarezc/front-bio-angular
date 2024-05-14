import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrawService {

  constructor(private http:HttpClient) { }

  public listStrawTypes() {
    return this.http.get(`${baserUrl}/strawTypes/`);
  }

  public getStrawType(strawTypeId:any) {
    return this.http.get(`${baserUrl}/strawTypes/id/${strawTypeId}`);
  }



  public addStrawType(strawType:any) {
    return this.http.post(`${baserUrl}/strawTypes/`, strawType)
  }

  public updateStrawType(strawTypeId: any, strawType: any): Observable<any> {
    return this.http.put(`${baserUrl}/strawTypes/update/${strawTypeId}`, strawType);
  }

  public deleteStrawType(strawTypeId:any) {
    return this.http.delete(`${baserUrl}/strawTypes/${strawTypeId}`);
  }

  public toggleStrawTypeStatus(strawTypeId: any, newStatus: boolean): Observable<any> {
    return this.http.put(`${baserUrl}/strawTypes/toggle-status/${strawTypeId}`, { enabled: newStatus });
  }

}
