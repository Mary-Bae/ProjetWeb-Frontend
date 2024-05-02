import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseModel } from '../../shared/course.model';
import { CourseService } from '../../shared/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.css']
})
export class FormCourseComponent {
model: CourseModel;
formCourse: FormGroup;
successMessage: string | null = null;

constructor(private courseService:CourseService, private route: ActivatedRoute){

  this.formCourse = new FormGroup({
    name: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    schedule: new FormControl('', Validators.required),
    teacher: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  this.route.params.subscribe(params=>{
    let name = params['name']

    if(name){
      this.courseService.GetByName(name).subscribe(course=>{

        if (course){

          this.formCourse.controls['name'].setValue(course.name);
          this.formCourse.controls['level'].setValue(course.level);
          this.formCourse.controls['schedule'].setValue(course.schedule);
          this.formCourse.controls['teacher'].setValue(course.teacher);
          this.formCourse.controls['description'].setValue(course.description);
        }
      })
    }
  })
}

save(form: FormGroup) {

  let model = form.value;
    model.name= form.value.name;
    model.level= form.value.level;
    model.schedule= form.value.schedule;
    model.teacher= form.value.teacher;
    model.description= form.value.description;

    this.courseService.GetByName(model.name).subscribe(existingCourse => {
      if (existingCourse) {
        // Si le cours existe déjà, mettre à jour avec HTTP PUT
        this.courseService.updateCourse(model).subscribe(
          () => {
            this.successMessage = "Course updated successfully.";
            setTimeout(() => {
              this.successMessage = null; // Effacer le message après 2 secondes
              window.location.href = '/table-course'; // Rediriger vers la page de la table des cours
            }, 2000);
            //window.location.href = '/table-course';
          },
          error => {
            console.error("Error updating course:", error);
          }
        );
      } else {
        // Si le cours n'existe pas encore, ajouter avec HTTP POST
        this.courseService.Post(model).subscribe(
          () => {
            this.successMessage = "Course Added successfully.";
            setTimeout(() => {
              this.successMessage = null; // Effacer le message après 2 secondes
              window.location.href = '/form-course'; // Renouveller le formulaire pour un autre ajout
            }, 2000);
          },
          error => {
            console.error("Error adding course:", error);
          }
        );
      }
    });
  }}