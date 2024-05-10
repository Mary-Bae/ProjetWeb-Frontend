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

  addUnrollement(userId: number, courseId: number)
  {
    return this.http.post(`https://localhost:7093/Unroll?userId=${userId}&courseId=${courseId}`, {}, this.httpOptions);
  }
  delUnrollement(userId: number, courseId: number)
  {
    return this.http.delete(`https://localhost:7093/Unroll?userId=${userId}&courseId=${courseId}`, this.httpOptions);
  }
  getStudentsByCourse(courseId: number) {
    return this.http.get<UnrollModel[]>("https://localhost:7093/Unroll/StudentsByCourse/" + courseId, this.httpOptions);
  }
}
