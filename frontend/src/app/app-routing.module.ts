import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCourseComponent } from './Course/form-course/form-course.component';
import { TableCourseComponent } from './Course/table-course/table-course.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {path:"form-course", component:FormCourseComponent},
  {path:"form-course/:id", component:FormCourseComponent},
  {path:"table-course", component:TableCourseComponent, canActivate:[authGuard]},
  {path:"login", component:LoginComponent},
  { path: '', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
