import { Component } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent {
  students: any
  successMessage: string | null = null

  constructor(private userService: UserService, private router:Router){

    this.loadStudents();
  }

  loadStudents() {
    this.userService.GetStudentswithGrades().subscribe(x => {
    this.students = x;
    })
  }

  edit(id: number) {
    if (id) {
      this.router.navigate(['form-course', id]);
    } else {
      console.error('Undefined course ID');
    }
  }

}
