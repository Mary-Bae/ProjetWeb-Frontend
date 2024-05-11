import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/Course/course.service';
import { CourseModel } from 'src/app/shared/Course/course.model';
import { UnrollModel } from 'src/app/shared/Unrollement/unroll.model';
import { UnrollService } from 'src/app/shared/Unrollement/unroll.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  username: string;
  userId: number;
  selectedCourseId: number;
  courses: CourseModel[] = [];
  students: UnrollModel[] = [];

  constructor(private route: ActivatedRoute, private courseService: CourseService, private unrollService: UnrollService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.username = params['username'];
    this.loadCourses();
    }
  )}

  loadCourses() {
    this.courseService.Get().subscribe(x => {
      this.courses = x;
    })
  }

  SelectCourse(courseId: number) {
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