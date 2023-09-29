import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://159.65.96.86:8080/services/auth/signin';
  

  constructor(
    private http: HttpClient,
    public router: Router
    ) {}

  login(username: string, password: string) {
    return this.http.post(this.apiUrl, { username, password });
  }

  verificarGuard() {
    return sessionStorage.getItem('Guard') !== null ? true : false;
  }

  logout(){
    sessionStorage.removeItem('Guard');
    return this.router.navigate(['']);
  }
}