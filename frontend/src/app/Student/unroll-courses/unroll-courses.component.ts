import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseModel } from '../../shared/course.model';
import { CourseService } from '../../shared/course.service';
import { GradeModel } from '../../shared/grade.model';
import { GradeService } from '../../shared/grade.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unroll-courses',
  templateUrl: './unroll-courses.component.html',
  styleUrls: ['./unroll-courses.component.css']
})
export class UnrollCoursesComponent implements OnInit{
goBack() {
throw new Error('Method not implemented.');
}
confirmSelection() {
throw new Error('Method not implemented.');
}
  studentName: string;
  gradeName: string;
  grade: string;
  userId: number;
  courses: any;
  successMessage: string | null = null

  constructor(private courseService: CourseService, private gradeService: GradeService, private route: ActivatedRoute, private router:Router){
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.Get().subscribe(x => {
      this.courses = x;
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.gradeService.GetGradesByUser(this.userId).subscribe({
        next: (user) => {
          this.studentName = user.username;
          this.gradeName = user.gradeName;
        }
    });
  }
)}

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
