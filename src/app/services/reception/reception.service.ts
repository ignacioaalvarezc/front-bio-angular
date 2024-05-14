import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';
import { Reception } from 'src/app/models/reception/reception';
import { SearchReception } from 'src/app/pages/admin/processes/reception/view-receptions/search';
import { SearchReceptionProd } from 'src/app/pages/admin/processes/reception/view-reception-production/searchReceptionProd';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(private http:HttpClient) { }

  public listReceptions() {
    return this.http.get(`${baserUrl}/receptions/`);
  }

  public saveReception(reception:any) {
    return this.http.post(`${baserUrl}/receptions/`, reception);
  }

  public getReception(receptionId:any) {
    return this.http.get(`${baserUrl}/receptions/id/${receptionId}`);
  }

  public updateReception(receptionId:any, reception: any): Observable<any> {
    return this.http.put(`${baserUrl}/receptions/update/${receptionId}`, reception);
  }

  public deleteReception(receptionId:any) {
    return this.http.delete(`${baserUrl}/receptions/${receptionId}`);
  }
  
  listReceptionsByDateRange(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
    .set('startDate', startDate.toISOString())
    .set('endDate', endDate.toISOString());

    return this.http.get<any>(`${baserUrl}/receptions/date-filter`, { params });
  }

  searchReceptionsByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/receptions/search`, { params });
  }

  exportToPdf(filteredData: any[]): Observable<Blob> {
    return this.http.post(`${baserUrl}/receptions/exportPdf`, filteredData, { responseType: 'blob' });
  }

  exportToExcel(filteredData: any[]): Observable<Blob> {
    return this.http.post(`${baserUrl}/receptions/exportExcel`, filteredData, { responseType: 'blob' });
  }

  responsibles(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/responsible/list`);
  }

  receptions(search: SearchReception): Observable<any[]> {
    return this.http.post<any[]>(`${baserUrl}/receptions/lists`, search);
  }

  receptionsProd(search: SearchReceptionProd): Observable<any[]> {
    return this.http.post<any[]>(`${baserUrl}/receptions/lists`, search);
  }

  getMonthlyReceptions(): Observable<Reception[]> {
    return this.http.get<Reception[]>(`${baserUrl}/receptions/monthly`);
  }

  getReceptionsAndTotalHoursForCurrentMonth(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/receptions/totalHoursForMonth`);
  }

  

  
}
