import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  constructor(private http:HttpClient) { }

  public listResponsibles() {
    return this.http.get(`${baserUrl}/responsibles/`)
  }

  public getResponsible(responsibleId:any) {
    return this.http.get(`${baserUrl}/responsibles/id/${responsibleId}`);
  }

  public addResponsible(responsible:any) {
    return this.http.post(`${baserUrl}/responsibles/`, responsible)
  }

  public updateResponsible(responsibleId: any, responsible: any): Observable<any> {
    return this.http.put(`${baserUrl}/responsibles/update/${responsibleId}`, responsible);
  }

  public deleteResponsible(responsibleId:any) {
    return this.http.delete(`${baserUrl}/responsibles/${responsibleId}`);
  }

  public toggleResponsibleStatus(responsibleId: any, newStatus: boolean): Observable<any> {
    return this.http.put(`${baserUrl}/responsibles/toggle-status/${responsibleId}`, { enabled: newStatus })
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError('Error al cambiar el estado.')
        })
      );
  }
}
