import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';
import { SanitizedBox } from 'src/app/models/sanitized/sanitized-box';

@Injectable({
  providedIn: 'root'
})
export class SanitizedBoxService {

  constructor(private http:HttpClient) { }

  public listSanitizedBoxes() {
    return this.http.get(`${baserUrl}/sanitizedBoxes/`);
  }

  public saveSanitizedBox(sanitizedBox:any) {
    return this.http.post(`${baserUrl}/sanitizedBoxes/`, sanitizedBox);
  }

  public getSanitizedBox(sanitizedBoxId:any) {
    return this.http.get(`${baserUrl}/sanitizedBoxes/id/${sanitizedBoxId}`);
  }

  public updateSanitizedBox(sanitizedBoxId:any, sanitizedBox: any): Observable<any> {
    return this.http.put(`${baserUrl}/sanitizedBoxes/update/${sanitizedBoxId}`, sanitizedBox);
  }

  public deleteSanitizedBox(sanitizedBoxId:any) {
    return this.http.delete(`${baserUrl}/sanitizedBoxes/${sanitizedBoxId}`);
  }

  searchSanitizedBoxesByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/sanitizedBoxes/search`, { params });
  }


  saveAllSanitizedBoxes(sanitizedBoxes: SanitizedBox[]) {
    return this.http.post<any>(`${baserUrl}/sanitizedBoxes/saveAll/`, sanitizedBoxes);
  }
}
