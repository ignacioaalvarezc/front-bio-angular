import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';
import { SearchSizing } from 'src/app/models/search/search-sizing';

@Injectable({
  providedIn: 'root'
})
export class SizingService {

  constructor(private http:HttpClient) { }

  public listSizingProcesses() {
    return this.http.get(`${baserUrl}/sizedBaskets/`);
  }

  public saveSizing(sizedBasket:any) {
    return this.http.post(`${baserUrl}/sizedBaskets/`, sizedBasket);
  }

  public getSizing(sizedBasketId:any) {
    return this.http.get(`${baserUrl}/sizedBaskets/id/${sizedBasketId}`);
  }

  public updateSizing(sizedBasketId:any, sizedBasket: any): Observable<any> {
    return this.http.put(`${baserUrl}/sizedBaskets/update/${sizedBasketId}`, sizedBasket);
  }

  public deleteSizing(sizedBasketId:any) {
    return this.http.delete(`${baserUrl}/sizedBaskets/${sizedBasketId}`);
  }

  public listSizingProcessesOfAResponsible(sizedBasketId:any): Observable<any> {
    return this.http.get(`${baserUrl}/sizedBaskets/sizedBasket/${sizedBasketId}`);
  }

  listSizingProcessesByDateRange(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
    .set('startDate', startDate.toISOString())
    .set('endDate', endDate.toISOString());

    return this.http.get<any>(`${baserUrl}/sizedBaskets/date-filter`, { params });
  }

  searchSizingsByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/sizedBaskets/search`, { params });
  }

  exportToPdf(filteredData: any[]): Observable<Blob> {
    return this.http.post(`${baserUrl}/sizedBaskets/exportPdf`, filteredData, { responseType: 'blob' });
  }

  exportToExcel(filteredData: any[]): Observable<Blob> {
    return this.http.post(`${baserUrl}/sizedBaskets/exportExcel`, filteredData, { responseType: 'blob' });
  }


  strawTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/strawType/list`);
  }

  responsibles(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/responsible/list`);
  }

  sizings(search: SearchSizing): Observable<any[]> {
    return this.http.post<any[]>(`${baserUrl}/sizedBaskets/lists`, search);
  }
}
