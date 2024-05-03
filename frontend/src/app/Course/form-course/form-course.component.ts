import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseModel } from '../../shared/course.model';
import { CourseService } from '../../shared/course.service';
import { UserModel } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.css']
})
export class FormCourseComponent implements OnInit {
model: CourseModel;
formCourse: FormGroup;
successMessage: string | null = null
currentCourseId?: number;  // Stocker l'ID du cours ici

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
            } else {
              console.error('Course ID is undefined');
            }
          });
        }

    loadUsers() {
      this.userService.GetUsers().subscribe(users => {
        this.users = users;
      }, error => {
        console.error('Failed to load users', error);
      });
    }

    save(form: FormGroup) {
      let model = form.value as CourseModel;
      model.id = this.currentCourseId;
      console.log(model.id)
      if (this.currentCourseId) {
        this.courseService.updateCourse(model).subscribe(
          () => {
            console.log("Course updated successfully.");
            // Redirection
          }
        );
      } else {
        this.courseService.Post(model).subscribe(
          () => {
            console.log("Course added successfully.");
            // Redirection
          }
        );
      }
    }
  }