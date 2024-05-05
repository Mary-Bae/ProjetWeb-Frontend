import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../shared/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm:FormGroup;
loginError: string = '';

constructor(private authService: AuthentificationService, private router: Router){
  this.loginForm= new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(4)
    ]),
    password: new FormControl("", [Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{9,}$")
    ]),
  })
}

login(){
  this.authService.Login(this.loginForm.value.username, this.loginForm.value.password)
  .subscribe(response => {
    console.log(response);
    if(response.token){
      const token = response.token;
      this.authService.saveToken(token);
      //localStorage.setItem("jwt", token); => Suppression de la methode car incluse dans la methode savetoken en plus de la verification du role
      this.router.navigate(["/"]);
    }
  }, error => { // => Le rajout de ceci permet à l'application de ne pas cracher si le login n'est pas bon
    console.error(error);
    this.loginError = 'Login ou mot de passe incorrect';
  })
}

register() {
    this.authService.Register(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(["/"]);
    });
}

}

