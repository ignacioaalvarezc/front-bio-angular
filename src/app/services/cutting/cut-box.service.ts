import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';
import { CutBox } from 'src/app/models/cutting/cutBox';
import { SearchCutBox } from 'src/app/pages/admin/processes/cutting/process/view-cuttings/search';

@Injectable({
  providedIn: 'root'
})
export class CutBoxService {

  constructor(private http:HttpClient) { }

  public listCutBoxes() {
    return this.http.get(`${baserUrl}/cutBoxes/`);
  }

  public saveCutBox(cutBox:any) {
    return this.http.post(`${baserUrl}/cutBoxes/`, cutBox);
  }

  public getCutBox(cutBoxId:any) {
    return this.http.get(`${baserUrl}/cutBoxes/id/${cutBoxId}`);
  }

  public updateCutBox(cutBoxId:any, cutBox: any): Observable<any> {
    return this.http.put(`${baserUrl}/cutBoxes/update/${cutBoxId}`, cutBox);
  }

  public deleteCutBox(cutBoxId:any) {
    return this.http.delete(`${baserUrl}/cutBoxes/${cutBoxId}`);
  }

  searchCutBoxesByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/cutBoxes/search`, { params });
  }

  searchCutBoxesByCutTypeName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/cutBoxes/searchCutType`, { params });
  }

  responsibles(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/responsible/list`);
  }

  cutBoxes(search: SearchCutBox): Observable<any[]> {
    return this.http.post<any[]>(`${baserUrl}/cutBoxes/lists`, search);
  }

  exportToPdf(filteredData: any[]): Observable<Blob> {
    return this.http.post(`${baserUrl}/cutBoxes/exportPdf`, filteredData, { responseType: 'blob' });
  }

  exportToExcel(filteredData: any[]): Observable<Blob> {
    return this.http.post(`${baserUrl}/cutBoxes/exportExcel`, filteredData, { responseType: 'blob' });
  }

  saveAllCutBoxes(cutBoxes: CutBox[]) {
    return this.http.post<any>(`${baserUrl}/cutBoxes/saveAll/`, cutBoxes)
  }

  getTotalAmountForMiniCuts(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/cutBoxes/totalAmountForMiniCuts`);
  }

  getTotalAmountForStandardCuts(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cutBoxes/totalAmountForStandardCuts`);
  }

  getTotalAmountForBiggyCuts(): Observable<any> {
    return this.http.get<any>(`${baserUrl}/cutBoxes/totalAmountForBiggyCuts`);
  }
  

  getTotalAmountByCutType(name: string): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cutBoxes/totalAmountByCutType/${name}`);
  }
}
