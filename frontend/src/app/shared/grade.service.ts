import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GradeModel } from './grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  token = localStorage.getItem('jwt');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient) { }

  GetGrades()
  {
    return this.http.get<Array<GradeModel>>("https://localhost:7093/Grade", this.httpOptions)
  }

}
