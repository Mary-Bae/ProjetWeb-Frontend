import { Component } from '@angular/core';
import { CourseService } from '../../shared/course.service';
import { CourseModel } from '../../shared/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-course',
  templateUrl: './table-course.component.html',
  styleUrls: ['./table-course.component.css']
})
export class TableCourseComponent {

  courses: any;

  constructor(private courseService: CourseService, private router:Router){

    courseService.Get().subscribe(x=> {
      this.courses = x
    })  
  }
  edit(name:string){
    this.router.navigate(['form-course', name])
  }
}
