import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GradeModel } from '../../shared/grade.model';
import { GradeService } from '../../shared/grade.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit {
  formUser: FormGroup;
  successMessage: string | null = null
  currentUserId?: number;
  grades: GradeModel[] = [];

  constructor(private gradeService:GradeService, private route: ActivatedRoute, private router: Router){

    this.formUser = new FormGroup({
      username: new FormControl('', Validators.required),
      gradeId: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.loadGrades()
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      if (userId) {
        this.currentUserId = userId;
        this.gradeService.GetGradesByUser(userId).subscribe({
              next: (user) => {
                  if (user) {
                      this.formUser.patchValue({
                          username: user.username,
                          gradeId: user.gradeId
                          
                      });
                  }
              },
              error: (error) => console.error('Failed to fetch user by id:', error)
          });
      }
  });
}
      loadGrades() {
        this.gradeService.GetGrades().subscribe(grades => {
          this.grades = grades;
        }, error => {
          console.error('Failed to load grades: ', error);
        });
      }

      save(form: FormGroup) {
        let gradeId = form.value.gradeId;
        if (this.currentUserId) {
        this.gradeService.UpdateGrade(this.currentUserId, gradeId).subscribe({
        next: () => {
          console.log("Grade updated successfully.");
          this.successMessage = "Grade modifié avec succès";
        setTimeout(() => this.successMessage = null, 2000);
        },
          error: (error) => {
          console.error("Failed to update grade:", error);
        }
      });
    }
  }

  unroll() {
    if (this.currentUserId) {
      this.router.navigate(['unroll-courses', this.currentUserId]);
    } else {
      console.error('Undefined Student ID');
    }
  }

}