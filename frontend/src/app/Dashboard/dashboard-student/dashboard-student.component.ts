import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnrollService } from '../../shared/Unrollement/unroll.service';
import { CourseModel } from 'src/app/shared/Course/course.model';
import { UnrollModel } from 'src/app/shared/Unrollement/unroll.model';
import { CourseService } from 'src/app/shared/Course/course.service';
import { UserService } from 'src/app/shared/User/user.service';
import { GradeService } from '../../shared/Grade/grade.service';


@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  username: string;
  userId: number;
  gradeName: string;
  courses: CourseModel[] = [];

  constructor(private route: ActivatedRoute, private unrollService: UnrollService, 
    private courseService: CourseService,  private userService:  UserService, private gradeService: GradeService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.userId = +params['id'];

      this.userService.getUserByUsername(this.username).subscribe({
        next: (user) => {
          this.userId = user.id;
          this.loadGrade(this.userId);
          this.loadCourses(this.userId);
        },
        error: (error) => {
          console.error('Failed to get user ID', error);
        }
      });
    });
  }

  loadGrade(userId: number) {
    this.gradeService.GetGradesByUser(userId).subscribe({
      next: (user) => {
        this.gradeName = user.gradeName;
      },
      error: (error) => {
        console.error('Failed to get grade for user', error);
      }
    });
  }

  loadCourses(userId: number) {
    this.unrollService.getUnrolledCourses(userId).subscribe({
      next: (unrollments: UnrollModel[]) => {
        unrollments.forEach(unroll => {
          this.courseService.GetById(unroll.courseId).subscribe(course => {
            this.courses.push(course);
          });
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des cours', error);
      }
    });
  }
}
