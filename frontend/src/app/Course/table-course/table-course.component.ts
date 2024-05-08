import { Component } from '@angular/core';
import { CourseService } from '../../shared/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-course',
  templateUrl: './table-course.component.html',
  styleUrls: ['./table-course.component.css']
})
export class TableCourseComponent  {

  courses: any;
  successMessage: string | null = null

  constructor(private courseService: CourseService, private router:Router){
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.Get().subscribe(x => {
      this.courses = x;
    })
  }

  edit(id: number) {
    if (id) {
      this.router.navigate(['form-course', id]);
    } else {
      console.error('Undefined course ID');
    }
  }

  del(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce cours ? \nLa suppression sera définitive')) {
      this.courseService.Del(id).subscribe(() => {    
          console.log('Course deleted successfully');
          this.successMessage = "Cours supprimé avec succès"
          setTimeout(() => this.successMessage = null, 2000);
          this.loadCourses();
        })
      }     
   }
}
