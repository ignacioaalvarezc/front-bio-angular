import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CleaningToolsService {

  constructor(private http:HttpClient) { }

  public listCleaningTools() {
    return this.http.get(`${baserUrl}/cleaningTools/`);
  }

  public saveCleaningTool(cleaningTool:any) {
    return this.http.post(`${baserUrl}/cleaningTools/`, cleaningTool);
  }

  public getCleaningTool(cleaningToolId:any) {
    return this.http.get(`${baserUrl}/cleaningTools/id/${cleaningToolId}`);
  }

  public updateCleaningTool(cleaningToolId:any, cleaningTool: any): Observable<any> {
    return this.http.put(`${baserUrl}/cleaningTools/update/${cleaningToolId}`, cleaningTool);
  }

  public deleteCleaningTool(cleaningTool:any) {
    return this.http.delete(`${baserUrl}/cleaningTools/${cleaningTool}`);
  }
}
