import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseModel } from '../../shared/course.model';
import { CourseService } from '../../shared/course.service';
import { UserModel } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unroll-courses',
  templateUrl: './unroll-courses.component.html',
  styleUrls: ['./unroll-courses.component.css']
})
export class UnrollCoursesComponent {

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
