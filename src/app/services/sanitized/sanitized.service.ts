import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanitizedService {

  constructor(private http:HttpClient) { }

  public listSanitizeds() {
    return this.http.get(`${baserUrl}/sanitizeds/`);
  }

  public saveSanitized(sanitized:any) {
    return this.http.post(`${baserUrl}/sanitizeds/`, sanitized);
  }

  public getSanitized(sanitizedId:any) {
    return this.http.get(`${baserUrl}/sanitizeds/id/${sanitizedId}`);
  }

  /*
  public updateSanitating(sanitatedBasketId:any, sanitatedBasket: any): Observable<any> {
    return this.http.put(`${baserUrl}/sanitatedBaskets/update/${sanitatedBasketId}`, sanitatedBasket);
  }
*/
  public updateSanitized(sanitizedId: any, sanitized:any): Observable<any> {
    return this.http.put(`${baserUrl}/sanitizeds/update/${sanitizedId}`, sanitized)
  }

  public deleteSanitized(sanitizedId:any) {
    return this.http.delete(`${baserUrl}/sanitizeds/${sanitizedId}`);
  }

  listSanitizedsByDateRange(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
    .set('startDate', startDate.toISOString())
    .set('endDate', endDate.toISOString());

    return this.http.get<any>(`${baserUrl}/sanitizeds/date-filter`, { params });
  }

  searchSanitizedsByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/sanitizeds/search`, { params });
  }

}
