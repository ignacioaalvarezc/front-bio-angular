import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';
import { ExtraTask } from 'src/app/models/extra-task/extraTask';

@Injectable({
  providedIn: 'root'
})
export class ExtraTaskService {

  constructor(private http:HttpClient) { }

  public listExtraTasks() {
    return this.http.get(`${baserUrl}/extraTasks/`);
  }

  public saveExtraTask(extraTask:any) {
    return this.http.post(`${baserUrl}/extraTasks/`, extraTask);
  }

  public getExtraTask(extraTaskId:any) {
    return this.http.get(`${baserUrl}/extraTasks/id/${extraTaskId}`);
  }

  public updateExtraTask(cuttingId:any, cutting: any): Observable<any> {
    return this.http.put(`${baserUrl}/extraTasks/update/${cuttingId}`, cutting);
  }

  public deleteExtraTask(extraTaskId:any) {
    return this.http.delete(`${baserUrl}/extraTasks/${extraTaskId}`);
  }

  listCuttingsByDateRange(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
    .set('startDate', startDate.toISOString())
    .set('endDate', endDate.toISOString());

    return this.http.get<any>(`${baserUrl}/extraTasks/date-filter`, { params });
  }

  searchCuttingsByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/extraTasks/search`, { params });
  }

  saveAllExtraTasks(extraTasks: ExtraTask[]) {
    return this.http.post<any>(`${baserUrl}/extraTasks/saveAllExtraTasks/`, extraTasks);
  }
}
