import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  public listOrders() {
    return this.http.get(`${baserUrl}/orders/`);
  }

  public saveOrder(order:any) {
    return this.http.post(`${baserUrl}/orders/`, order);
  }

  public getOrder(orderId:any) {
    return this.http.get(`${baserUrl}/orders/id/${orderId}`);
  }

  public updateOrder(orderId:any, order: any): Observable<any> {
    return this.http.put(`${baserUrl}/orders/update/${orderId}`, order);
  }

  public deleteOrder(orderId:any) {
    return this.http.delete(`${baserUrl}/orders/${orderId}`);
  }

  listOrdersByDateRange(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
    .set('startDate', startDate.toISOString())
    .set('endDate', endDate.toISOString());

    return this.http.get<any>(`${baserUrl}/orders/date-filter`, { params });
  }

  getUnprocessedOrdersCount(): Observable<number> {
    return this.http.get<number>(`${baserUrl}/orders/count`);
  }
}
