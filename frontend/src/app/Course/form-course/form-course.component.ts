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
    username: new FormControl('', Validators.required),
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
            this.formCourse.patchValue(course);
          }, error => {
            console.error("Error fetching course:", error);
          });
        }
      });
    }

    loadUsers() {
      this.userService.GetUsers().subscribe(data => {
        this.users = data;
      }, error => {
        console.error('Failed to load users', error);
      });
    }

    save(form: FormGroup) {
      let model = form.value as CourseModel;
    
      if (this.currentCourseId) {
        this.courseService.updateCourse(model).subscribe(success => {
          // Logique de succès
        }, error => {
          console.error("Error updating course:", error);
        });
      } else {
        this.courseService.Post(model).subscribe(success => {
          // Logique de succès
        }, error => {
          console.error("Error adding course:", error);
        });
      }
    }
  }