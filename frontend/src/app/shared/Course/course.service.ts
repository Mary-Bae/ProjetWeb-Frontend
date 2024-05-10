import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseModel } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

   //Le changement de la methode ici aura permis à arranger le problème d'authentification que j'avais.
  token = localStorage.getItem('jwt');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient) { 
  }

  Get()
  {
    return this.http.get<Array<CourseModel>>("https://localhost:7093/Course", this.httpOptions)
  }

  GetById(id: number)
  { 
    return this.http.get<CourseModel>("https://localhost:7093/Course/ById?Id=" + id, this.httpOptions);
  }

  Post(course: CourseModel)
  {
    return this.http.post("https://localhost:7093/Course", course, this.httpOptions);
  }

  updateCourse(course: any) {
    return this.http.put(`https://localhost:7093/Course/${course.id}`, course, this.httpOptions);
  }

  Del(id: number)
  { 
    return this.http.delete<CourseModel>(`https://localhost:7093/Course/${id}`, this.httpOptions);
  }
  getCoursesByInstructor(Id: number) {
    return this.http.get<CourseModel[]>(`https://localhost:7093/Course/ByTeacher/${Id}`, this.httpOptions);
}
  
}
