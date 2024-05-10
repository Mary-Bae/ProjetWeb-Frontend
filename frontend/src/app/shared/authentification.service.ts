import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  token = localStorage.getItem('jwt');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }

  constructor(private http:HttpClient, public jwtHelper: JwtHelperService) {}
  
  Login(username: string, password: string): Observable<any> {
    return this.http.post(`https://localhost:7093/Authentication/Login?login=${username}&password=${password}`, null);
  }

  Register(username: string, password: string): Observable<any> {
    return this.http.post(`https://localhost:7093/Authentication/Register?login=${username}&password=${password}`, null);
  }

  isAuthenticated(): boolean{
      //Utilisation de localstorage plutot que sessionstorage pour éviter une déconnection à chaque fois qu'on change de page
    const token = localStorage.getItem('jwt'); 
    return token != null;
  }

  refreshToken() {
      //Utilisation de localstorage plutot que sessionstorage pour éviter une déconnection à chaque fois qu'on change de page
    const token = localStorage.getItem('jwt');
    return this.http.get("https://localhost:7093/Authentication/Refreshtoken?token="+token);
  }

  saveToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.decodeAndStoreRole(token);
  }

  decodeAndStoreRole(token: string): void {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const username = decodedToken['sub'];
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return localStorage.getItem('role');
  }

  AssignRole(username: string, roleId: number) {
    return this.http.post(`https://localhost:7093/Authentication/AssignRole?username=${username}&roleId=${roleId}`, {}, this.httpOptions);
  }

}
 