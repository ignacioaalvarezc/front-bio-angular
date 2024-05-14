import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HackerService {

  constructor(private _http: HttpClient) { }

  getHackers(): Observable<any>{
    var url = "https://6375246a48dfab73a4f31b60.mockapi.io/vg1/hackers";
    return this._http.get(url);
  }
}
