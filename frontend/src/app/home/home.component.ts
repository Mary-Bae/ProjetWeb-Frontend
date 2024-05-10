import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {

  constructor(private route: ActivatedRoute, private router: Router){
  }
  
  openDashboard(){
  
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (role === 'student') {
      this.router.navigate([`/dashboard-student/${username}`]);
    } else if (role === 'instructor') {
      this.router.navigate([`/dashboard-teacher/${username}`]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
