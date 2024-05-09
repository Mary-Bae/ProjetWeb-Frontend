import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UnrollModel} from './unroll.model';

@Injectable({
  providedIn: 'root'
})
export class UnrollService {
  token = localStorage.getItem('jwt');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient) { }

  getUnrolledCourses(id: number)
  { 
    return this.http.get<UnrollModel[]>("https://localhost:7093/Unroll/GetUnrollByUser/" + id, this.httpOptions);
  }
}
