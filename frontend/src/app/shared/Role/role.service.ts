import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleModel } from './role.model';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  token = localStorage.getItem('jwt');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient) { }

  GetRoles()
  {
    return this.http.get<Array<RoleModel>>("https://localhost:7093/Role", this.httpOptions)
  }

}
