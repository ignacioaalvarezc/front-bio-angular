import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http:HttpClient) { }

  public listActivities() {
    return this.http.get(`${baserUrl}/activities/`);
  }

  public saveActivities(activity: any) {
    return this.http.post(`${baserUrl}/activities/`, activity);
  } 

  public getActivity(activityId:any) {
    return this.http.get(`${baserUrl}/activities/id/${activityId}`);
  }

  public updateActivity(activityId:any, activity: any): Observable<any> {
    return this.http.put(`${baserUrl}/activities/update/${activityId}`, activity);
  }

  public deleteActivity(activityId:any) {
    return this.http.delete(`${baserUrl}/activities/${activityId}`);
  }

  /*
  getMiniCutFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cutTypes/mini-factor/`);
  }

  getStandardCutFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cutTypes/standard-factor/`);
  }

  getBiggyCutFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cutTypes/biggy-factor/`);
  }
  */
}
