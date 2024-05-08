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

  constructor(private userService: UserService, private router:Router){

    this.loadStudents();
  }

  loadStudents() {
    this.userService.GetStudentswithGrades().subscribe(x => {
    this.students = x;
    })
  }

  edit(userId: number) {
    console.log(userId)
    if (userId) {
      this.router.navigate(['manage-student', userId]);
    } else {
      console.error('Undefined Student ID');
    }
  }

}
