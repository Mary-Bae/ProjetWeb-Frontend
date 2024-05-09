import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCourseComponent } from './Course/form-course/form-course.component';
import { TableCourseComponent } from './Course/table-course/table-course.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';
import { HomeComponent } from './home/home.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { AdminUsersComponent } from './Users/admin-users/admin-users.component';
import { AdminStudentsComponent } from './Student/admin-students/admin-students.component';
import { FormUserComponent } from './Users/form-user/form-user.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { ManageStudentComponent } from './Student/manage-student/manage-student.component';
import { UnrollCoursesComponent } from './Student/unroll-courses/unroll-courses.component';
import { DashboardStudentComponent } from './DashboardStudent/dashboard-student/dashboard-student.component';



const routes: Routes = [
  { path: '', component:HomeComponent },
  {path:"form-course", component:FormCourseComponent, canActivate:[authGuard], data: { roles: ['admin', 'instructor'] }},
  {path:"form-course/:id", component:FormCourseComponent, canActivate:[authGuard], data: { roles: ['admin', 'instructor'] }},
  {path:"table-course", component:TableCourseComponent, canActivate:[authGuard], data: { roles: ['admin', 'instructor'] }},
  {path:"admin-users", component:AdminUsersComponent, canActivate:[authGuard], data: { roles: ['admin'] }},
  {path:"add-user", component:AddUserComponent, canActivate:[authGuard], data: { roles: ['admin'] }},
  {path:"form-user/:id", component:FormUserComponent, canActivate:[authGuard], data: { roles: ['admin'] }},
  {path:"admin-students", component:AdminStudentsComponent, canActivate:[authGuard], data: { roles: ['admin', 'instructor'] }},
  {path:"manage-student/:id", component:ManageStudentComponent, canActivate:[authGuard], data: { roles: ['admin', 'instructor'] }},
  {path:"unroll-courses/:id", component:UnrollCoursesComponent, canActivate:[authGuard], data: { roles: ['admin', 'instructor', 'student'] }},
  {path:"dashboard-student/:id", component:DashboardStudentComponent, canActivate:[authGuard], data: { roles: ['student'] }},
  {path:"login", component:LoginComponent},
  {path:"unauthorized-page", component:UnauthorizedPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
