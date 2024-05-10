import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/Course/course.service';
import { UserService } from 'src/app/shared/User/user.service';
import { CourseModel } from 'src/app/shared/Course/course.model';
import { UnrollModel } from 'src/app/shared/Unrollement/unroll.model';
import { UnrollService } from 'src/app/shared/Unrollement/unroll.service';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {
  username: string;
  userId: number;
  selectedCourseId: number;
  courses: CourseModel[] = [];
  students: UnrollModel[] = [];

  constructor(private route: ActivatedRoute, private courseService: CourseService,  
    private userService:  UserService, private unrollService: UnrollService) {}

    ngOnInit() {
      this.route.params.subscribe(params => {
      this.username = params['username'];
      this.userService.getUserByUsername(this.username).subscribe({
        next: (user) => {
          this.userId = user.id;
          this.loadCourses(this.userId);
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }

  loadCourses(userId: number) {
    this.courseService.getCoursesByInstructor(userId).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => console.error(error)
    });
  }

  onSelectCourse(courseId: number) {
    this.selectedCourseId = courseId;
    this.loadStudents(this.selectedCourseId);
  }

  loadStudents(courseId: number) {
    this.unrollService.getStudentsByCourse(courseId).subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => console.error(error)
    });
  }
}
