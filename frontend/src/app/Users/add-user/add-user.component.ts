import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../shared/user.model';
import { RoleModel } from '../../shared/role.model';
import { UserService } from '../../shared/user.service';
import { RoleService } from '../../shared/role.service';
import { AuthentificationService } from '../../shared/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent{

  model: UserModel;
  formUser: FormGroup;
  successMessage: string | null = null
  roles: RoleModel[] = [];

  constructor(private userService:UserService,private roleService:RoleService, private authService: AuthentificationService, private route: ActivatedRoute, private router: Router){

    this.formUser = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      roleId: new FormControl('')
    });
    this.loadRoles()
  }

      loadRoles() {
        this.roleService.GetRoles().subscribe(roles => {
          this.roles = roles;
        }, error => {
          console.error('Failed to load roles: ', error);
        });
      }

      save(form: FormGroup) {
        let model = form.value as UserModel;

        this.authService.Register(model.username, model.password)
        .subscribe({
          next: () => {
              if(model.roleId && model.roleId !== -1){
                  this.authService.AssignRole(model.username, model.roleId).subscribe({
                      next: () => {
                          console.log("User updated successfully.");
                          this.formUser.reset();
                          this.successMessage = "Nouvel utilisateur rajouté avec succès"
                          setTimeout(() => this.successMessage = null, 2000);
                      },
                      error: (error) => {
                          console.error("Failed to update user:", error);
                      }
                  });
              } else {
                  console.log("User updated successfully.");
                  this.formUser.reset();
                  this.successMessage = "Nouvel utilisateur avec le role guest rajouté avec succès."
                  setTimeout(() => this.successMessage = null, 2000);
              }
          },
          error: (error) => {
              console.error("Failed to register user:", error);
          }
      });
  }
    }




