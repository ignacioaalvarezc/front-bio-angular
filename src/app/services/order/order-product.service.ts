import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  constructor(private http:HttpClient) { }

  public listOrderProducts() {
    return this.http.get(`${baserUrl}/orderProducts/`);
  }

  public getOrderProduct(orderProductId:any) {
    return this.http.get(`${baserUrl}/orderProducts/id/${orderProductId}`);
  }

  public addOrderProduct(orderProduct:any) {
    return this.http.post(`${baserUrl}/orderProducts/`, orderProduct)
  }

  public updateOrderProduct(orderProductId: any, orderProduct: any): Observable<any> {
    return this.http.put(`${baserUrl}/orderProducts/update/${orderProductId}`, orderProduct);
  }

  public deleteOrderProduct(orderProductId:any) {
    return this.http.delete(`${baserUrl}/orderProducts/${orderProductId}`);
  }

  public toggleOrderProductStatus(orderProductId: any, newStatus: boolean): Observable<any> {
    return this.http.put(`${baserUrl}/orderProducts/toggle-status/${orderProductId}`, { enabled: newStatus });
  }
}
