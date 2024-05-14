import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';
import { Responsible } from 'src/app/models/responsible';

@Injectable({
  providedIn: 'root'
})
export class CuttingService {

  constructor(private http:HttpClient) { }

  public listCuttings() {
    return this.http.get(`${baserUrl}/cuttings/`);
  }

  public saveCutting(cutting:any) {
    return this.http.post(`${baserUrl}/cuttings/`, cutting);
  }

  public getCutting(cuttingId:any) {
    return this.http.get(`${baserUrl}/cuttings/id/${cuttingId}`);
  }

  public updateCutting(cuttingId:any, cutting: any): Observable<any> {
    return this.http.put(`${baserUrl}/cuttings/update/${cuttingId}`, cutting);
  }

  public deleteCutting(cuttingId:any) {
    return this.http.delete(`${baserUrl}/cuttings/${cuttingId}`);
  }

  listCuttingsByDateRange(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
    .set('startDate', startDate.toISOString())
    .set('endDate', endDate.toISOString());

    return this.http.get<any>(`${baserUrl}/cuttings/date-filter`, { params });
  }

  searchCuttingsByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/cuttings/search`, { params });
  }

}
