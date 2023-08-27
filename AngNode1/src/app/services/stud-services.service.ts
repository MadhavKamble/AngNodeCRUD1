import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudServicesService {
  appURL = 'http://127.0.0.1:3530/students';
  constructor(private http: HttpClient) {}

  addStudService(item: any): Observable<any> {
    return this.http.post(this.appURL, item);
  }

  getStudService(): Observable<any> {
    return this.http.get(this.appURL);
  }
  deleteStudService(id: String): Observable<any> {
    console.log(id);
    return this.http.delete(`http://127.0.0.1:3530/students/${id}`);
  }
  editStudService(id: String, item: any): Observable<any> {
    console.log(id);
    return this.http.put(`http://127.0.0.1:3530/students/${id}`, item);
  }
}
