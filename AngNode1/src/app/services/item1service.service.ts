import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Item1serviceService {
  appURL = 'http://localhost:2530/items';
  constructor(private http: HttpClient) {}

  addItem1Service(item: any): Observable<any> {
    return this.http.post(this.appURL, item);
  }

  getItem1Service(): Observable<any> {
    return this.http.get(this.appURL);
  }
  deleteItem1Service(id: String): Observable<any> {
    return this.http.delete(`http://127.0.0.1:2530/items/${id}`);
  }
  editItem1Service(id: String, item: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:2530/items/${id}`, item);
  }
}
