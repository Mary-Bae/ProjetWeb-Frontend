import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GradeModel } from '../../shared/grade.model';
import { RoleModel } from '../../shared/role.model';
import { UserService } from '../../shared/user.service';
import { GradeService } from '../../shared/grade.service';
import { AuthentificationService } from '../../shared/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit {
  model: GradeModel;
  formUser: FormGroup;
  successMessage: string | null = null
  currentUserId?: number;
  grades: GradeModel[] = [];

  constructor(private userService:UserService,private gradeService:GradeService, private authService: AuthentificationService, private route: ActivatedRoute, private router: Router){

    this.formUser = new FormGroup({
      username: new FormControl('', Validators.required),
      gradeId: new FormControl('', Validators.required),
      gradeName: new FormControl('')
    });
  }

  ngOnInit() {
    this.loadGrades()
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if(id) {
        this.currentUserId = id;  // Sauvegarde de l'ID
        this.userService.getUserByUserId(this.currentUserId).subscribe(user => {
          if (user) {
              this.formUser.patchValue({
                  username: user.username,
                  gradeId: user.id
              });
            }
          },
          error => console.error('Failed to fetch user by id:', error)
        );
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
        let model = form.value as GradeModel;
        model.id = this.currentUserId;
        if (this.currentUserId) {
          //this.authService.AssignRole(model.username, model.roleId).subscribe(
            //() => {
              //console.log("User updated successfully.");
              //this.router.navigate(['/admin-users']);
           // },
            //error => {
             // console.error("Failed to update user:", error);
           // }
          //);
        }
      }
      
}
