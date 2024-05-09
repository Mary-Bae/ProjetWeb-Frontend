import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../shared/User/user.model';
import { RoleModel } from '../../shared/Role/role.model';
import { UserService } from '../../shared/User/user.service';
import { RoleService } from '../../shared/Role/role.service';
import { AuthentificationService } from '../../shared/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit{

  model: UserModel;
  formUser: FormGroup;
  successMessage: string | null = null
  currentUserId?: number;
  roles: RoleModel[] = [];

  constructor(private userService:UserService,private roleService:RoleService, private authService: AuthentificationService, private route: ActivatedRoute, private router: Router){

    this.formUser = new FormGroup({
      username: new FormControl('', Validators.required),
      roleId: new FormControl('', Validators.required),
      roleName: new FormControl('')
    });
  }

  ngOnInit() {
    this.loadRoles()
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if(id) {
        this.currentUserId = id;  // Sauvegarde de l'ID
        this.userService.getUserByUserId(this.currentUserId).subscribe(user => {
          if (user) {
              this.formUser.patchValue({
                  username: user.username,
                  roleId: user.roleId
              });
            }
          },
          error => console.error('Failed to fetch user by id:', error)
        );
      }
    });
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
        model.id = this.currentUserId;
        if (this.currentUserId) {
          this.authService.AssignRole(model.username, model.roleId).subscribe(
            () => {
              console.log("User updated successfully.");
              this.router.navigate(['/admin-users']);
            },
            error => {
              console.error("Failed to update user:", error);
            }
          );
        }
      }
      
}
