import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FormCourseComponent } from './Course/form-course/form-course.component'
import { ReactiveFormsModule } from '@angular/forms';
import { TableCourseComponent } from './Course/table-course/table-course.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { AdminUsersComponent } from './Users/admin-users/admin-users.component';
import { AdminStudentsComponent } from './Student/admin-students/admin-students.component';
import { FormUserComponent } from './Users/form-user/form-user.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { ManageStudentComponent } from './Student/manage-student/manage-student.component';
import { UnrollCoursesComponent } from './Student/unroll-courses/unroll-courses.component';
import { DashboardStudentComponent } from './Dashboard/dashboard-student/dashboard-student.component';
import { DashboardTeacherComponent } from './Dashboard/dashboard-teacher/dashboard-teacher.component';
import { DashboardAdminComponent } from './Dashboard/dashboard-admin/dashboard-admin.component';

export function tokenGetter(){
  return sessionStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormCourseComponent,
    TableCourseComponent,
    LoginComponent,
    HomeComponent,
    UnauthorizedPageComponent,
    AdminUsersComponent,
    AdminStudentsComponent,
    FormUserComponent,
    AddUserComponent,
    ManageStudentComponent,
    UnrollCoursesComponent,
    DashboardStudentComponent,
    DashboardTeacherComponent,
    DashboardAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    FormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
      },
    })
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 