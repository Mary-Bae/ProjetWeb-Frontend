import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseModel } from '../../shared/Course/course.model';
import { CourseService } from '../../shared/Course/course.service';
import { UserModel } from '../../shared/User/user.model';
import { UserService } from '../../shared/User/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.css']
})
export class FormCourseComponent implements OnInit {
model: CourseModel;
formCourse: FormGroup;
successMessage: string;
errorMessage: string;
currentCourseId?: number;
userRole: string = 'instructor';

users: UserModel[] = [];

constructor(private courseService:CourseService, private userService:UserService, private route: ActivatedRoute, private router: Router){

  this.formCourse = new FormGroup({
    name: new FormControl('', Validators.required),
    levelName: new FormControl('', Validators.required),
    schedule: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
}
    ngOnInit() {
      this.loadUsers();
      this.route.params.subscribe(params => {
        const id = +params['id'];
        if(id) {
          this.currentCourseId = id;  // Sauvegarde de l'ID
          this.courseService.GetById(id).subscribe(course => {
            if (course) {
                this.formCourse.patchValue({
                    name: course.name,
                    levelName: course.levelName,
                    schedule: course.schedule,
                    userId: course.userId,
                    description: course.description
                  });
                }
              });
            } 
          });
        }

    loadUsers() {
      this.userService.getUsersByRole(this.userRole).subscribe(users => {
        this.users = users;
      }, error => {
        console.error('Failed to load users for role: ' + this.userRole, error);
      });
    }

    save(form: FormGroup) {
      let model = form.value as CourseModel;
      model.id = this.currentCourseId;
      if (this.currentCourseId) {
        this.courseService.updateCourse(model).subscribe(
          () => {
            console.log("Course updated successfully.");
            this.router.navigate(['/table-course']);
          },
          error => {
            console.error("Failed to update course:", error);
            this.errorMessage = error.error.message;
            setTimeout(() => this.errorMessage = null, 2000);
          }
        );
      } else {
        this.courseService.Post(model).subscribe(
          () => {
            this.formCourse.reset();
            this.successMessage = "Cours rajouté avec succès"
            setTimeout(() => this.successMessage = null, 2000);
          },
          error => {
            console.error("Failed to add course:", error);
            this.errorMessage = error.error.message;
            setTimeout(() => this.errorMessage = null, 2000);
          }
        );
      }
    }
  }