import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';
import { Package } from 'src/app/models/packaging/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http:HttpClient) { }

  public listPackages() {
    return this.http.get(`${baserUrl}/packages/`);
  }

  public savePackage(pack:any) {
    return this.http.post(`${baserUrl}/packages/`, pack);
  }

  public getPackage(packageId:any) {
    return this.http.get(`${baserUrl}/packages/id/${packageId}`);
  }

  public updatePackage(packageId:any, pack: any): Observable<any> {
    return this.http.put(`${baserUrl}/packages/update/${packageId}`, pack);
  }

  public deletePackage(packageId:any) {
    return this.http.delete(`${baserUrl}/cutBoxes/${packageId}`);
  }

  searchPackagesByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name ? name: '');
    return this.http.get<any>(`${baserUrl}/packages/search`, { params });
  }

  exportToPdf(filteredData: any[]): Observable<Blob> {
    return this.http.post(`${baserUrl}/packages/exportPdf`, filteredData, { responseType: 'blob' });
  }

  exportToExcel(filteredData: any[]): Observable<Blob> {
    return this.http.post(`${baserUrl}/packages/exportExcel`, filteredData, { responseType: 'blob' });
  }

  saveAllPackages(packages: Package[]) {
    return this.http.post<any>(`${baserUrl}/packages/saveAll/`, packages)
  }


}
