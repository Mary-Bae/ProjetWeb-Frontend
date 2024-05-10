import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/Course/course.service';
import { UserService } from 'src/app/shared/User/user.service';
import { CourseModel } from 'src/app/shared/Course/course.model';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {
  username: string;
  userId: number;
  courses: CourseModel[] = [];

  constructor(private route: ActivatedRoute, private courseService: CourseService,  private userService:  UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.userId = +params['UserId']

      this.userService.getUserByUsername(this.username).subscribe({
        next: (user) => {
          this.userId = user.id;
          this.loadCourses(this.userId);
        },
        error: (error) => {
          console.error('Failed to get user ID', error);
        }
      });
    });
  }

  loadCourses(Id: number) {
    this.courseService.getCoursesByInstructor(Id).subscribe({
      next: (courses) => this.courses = courses,
      error: (error) => console.error(error)
    });
  }
}
