import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class CutFactorService {

  constructor(private http:HttpClient) { }

  getMiniCutFactor(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/cut-factors/mini-factor/`);
  }
}
