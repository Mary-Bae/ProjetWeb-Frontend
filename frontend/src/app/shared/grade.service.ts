import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GradeModel } from './grade.model';
import { Observable } from 'rxjs';

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

  GetGradesByUser(userId: number): Observable<GradeModel> {
    return this.http.get<GradeModel>(`https://localhost:7093/Grade/GetGradeByUser/${userId}`, this.httpOptions);
  }
  Post(studentGrade: GradeModel)
  {
    return this.http.post("https://localhost:7093/Grade", studentGrade, this.httpOptions);
  }

  UpdateGrade(userId: number, gradeId: number) {
    return this.http.put(`https://localhost:7093/Grade?userId=${userId}&gradeId=${gradeId}`, {}, this.httpOptions);

  }
}
