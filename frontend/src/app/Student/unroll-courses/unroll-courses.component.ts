import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/Course/course.service';
import { GradeService } from '../../shared/Grade/grade.service';
import { UnrollService } from '../../shared/Unrollement/unroll.service';
import { ActivatedRoute } from '@angular/router';

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
  successMessage: string | null = null

  constructor(private courseService: CourseService, private gradeService: GradeService,
    private unrollService: UnrollService, private route: ActivatedRoute){}

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
      error: (error) => console.error('Failed to found enrolled courses:', error)
    });
  }
}

  confirmSelection() {
    throw new Error('Method not implemented.');
    }
}
