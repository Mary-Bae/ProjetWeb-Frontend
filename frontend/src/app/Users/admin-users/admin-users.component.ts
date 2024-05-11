import { Component } from '@angular/core';
import { UserService } from '../../shared/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  users: any;
  successMessage: string
  errorMessage: string;

  constructor(private userService: UserService, private router:Router){

    this.loadUsers();
 
  }

  loadUsers() {
    this.userService.GetUsers().subscribe(x => {
      this.users = x;
    })
  }


  edit(id: number) {
    if (id) {
      this.router.navigate(['form-user', id]);
    } else {
      console.error('Undefined course ID');
    }
  }

  del(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ? \nLa suppression sera définitive')) {
      this.userService.Del(id).subscribe(() => {    
          console.log('User deleted successfully');
          this.successMessage = "Utilisateur supprimé avec succès"
          setTimeout(() => this.successMessage = null, 2000);
          this.loadUsers();
        },
        error => {
          console.error("Failed to delete course:", error);
          this.errorMessage = error.error.message;
          setTimeout(() => this.errorMessage = null, 3000);
        }
      )}  
   }
}
