import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/Course/course.service';
import { GradeService } from '../../shared/Grade/grade.service';
import { UnrollService } from '../../shared/Unrollement/unroll.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unroll-courses',
  templateUrl: './unroll-courses.component.html',
  styleUrls: ['./unroll-courses.component.css']
})
export class UnrollCoursesComponent implements OnInit{

  studentName: string;
  gradeName: string;
  userId: number;
  courses: any[];
  enrolledCourseIds: number[] = [];
  successMessage: string

  constructor(private courseService: CourseService, private gradeService: GradeService,
    private unrollService: UnrollService, private route: ActivatedRoute, private location: Location){}

  loadCourses() {
    this.courseService.Get().subscribe(courses => {
      this.courses = courses;
      this.loadEnrolledCourses();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadCourses();
      this.gradeService.GetGradesByUser(this.userId).subscribe({
        next: (user) => {
          this.studentName = user.username;
          this.gradeName = user.gradeName;
        }
    });
  }
)}

  loadEnrolledCourses() {
    if (this.userId) {
    this.unrollService.getUnrolledCourses(this.userId).subscribe({
      next: (enrolledCourses) => {
        this.enrolledCourseIds = enrolledCourses.map(course => course.courseId);
        this.courses.forEach(course => {
          course.isSelected = this.enrolledCourseIds.includes(course.id);
      });
  },
      error: (error) => console.error(error)
    });
  }
}

  confirmSelection() {
    this.courses.forEach(course => {
      if (course.isSelected && !this.enrolledCourseIds.includes(course.id)) {

        this.unrollService.addUnrollement(this.userId, course.id).subscribe({
          next: () => {
          },
          error: (error) => console.error(error)
        });
      } else if (!course.isSelected && this.enrolledCourseIds.includes(course.id)) {
        this.unrollService.delUnrollement(this.userId, course.id).subscribe({
          next: () => {
            console.log(`Deleted ${course.id}`);
          },
          error: (error) => console.error(error)
        });
      }
    });
    this.successMessage = "Enrollement réalisé avec succès"
    setTimeout(() => this.successMessage = null, 2000);
  }

  goBack() {
    this.location.back();
  }
}
