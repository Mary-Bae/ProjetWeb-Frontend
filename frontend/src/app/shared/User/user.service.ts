import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { GradeModel } from '../Grade/grade.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  token = localStorage.getItem('jwt');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient) { }

  GetUsers()
  {
    return this.http.get<Array<UserModel>>("https://localhost:7093/User", this.httpOptions)
  }

  getUsersByRole(roleName: string)
  {
    return this.http.get<Array<UserModel>>(`https://localhost:7093/User/ByRole/${roleName}`, this.httpOptions);
  }

  getUserByUserId(id: number)
  {
    return this.http.get<UserModel>("https://localhost:7093/User/ById?Id=" + id, this.httpOptions);
  }
  getUserByUsername(username: string) {
    return this.http.get<UserModel>(`https://localhost:7093/User/ByUsername/${username}`);
  }

  GetStudentswithGrades()
  {
    return this.http.get<Array<GradeModel>>("https://localhost:7093/User/grades", this.httpOptions)
  }

  Del(id: number)
  { 
    return this.http.delete<UserModel>(`https://localhost:7093/User/${id}`, this.httpOptions);
  }


}
