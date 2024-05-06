import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../shared/user.model';
import { RoleModel } from '../../shared/role.model';
import { UserService } from '../../shared/user.service';
import { RoleService } from '../../shared/role.service';
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

  constructor(private userService:UserService,private roleService:RoleService, private route: ActivatedRoute, private router: Router){

    this.formUser = new FormGroup({
      name: new FormControl({value: 'Disabled readonly input', disabled: true}, Validators.required),
      roleId: new FormControl('', Validators.required),
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
                  name: user.username,
                  roleId: user.roleId
                });
              }
            });
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
          //this.userService.updateUser(model).subscribe(
            //() => {
              //console.log("User updated successfully.");
              //this.router.navigate(['/admin-users']);
            //}
          //);
        } else {
          //this.userService.Post(model).subscribe(
           // () => {
             // this.formUser.reset();
              //this.successMessage = "Utilisateur rajouté avec succès"
              //setTimeout(() => this.successMessage = null, 2000);
           // }
          //);
        }
      }

}
