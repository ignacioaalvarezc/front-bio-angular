import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackagingService {

  constructor(private http:HttpClient) { }

  public listPackagings() {
    return this.http.get(`${baserUrl}/packagings/`);
  }

  public savePackaging(packaging:any) {
    return this.http.post(`${baserUrl}/packagings/`, packaging);
  }

  public getPackaging(packagingId:any) {
    return this.http.get(`${baserUrl}/packagings/id/${packagingId}`);
  }

  public updatePackaging(packagingId:any, packaging: any): Observable<any> {
    return this.http.put(`${baserUrl}/packagings/update/${packagingId}`, packaging);
  }

  public deletePackaging(packagingId:any) {
    return this.http.delete(`${baserUrl}/packagings/${packagingId}`);
  }

  listPackagingsByDateRange(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
    .set('startDate', startDate.toISOString())
    .set('endDate', endDate.toISOString());

    return this.http.get<any>(`${baserUrl}/packagings/date-filter`, { params });
  }

  searchPackagingsByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/packagings/search`, { params });
  }
}
