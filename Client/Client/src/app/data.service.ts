import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {   }

  getTransactions(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/transactions");
  }

  updateComments(data:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/updateComment",data);
  }
}
