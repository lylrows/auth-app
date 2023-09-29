import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
    ) {
      sessionStorage.removeItem('Guard');
      this.formLogin = this.formBuilder.group({
        username: ['',[Validators.required, Validators.email]],
        password: ['',Validators.required]
      })
   }

  ngOnInit() {
  }

  signIn(){
    this.user.username=this.formLogin.value.username;
    this.user.password=this.formLogin.value.password;
    this.authService.login(this.user.username,this.user.password).subscribe({
      next: (res:any)=>{
        sessionStorage.setItem('Guard', res.accessToken);
        this.snackBar.open('Acceso Correcto', 'Ok', {
          duration: 3000
        });
        this.router.navigate(['dashboard']);
      },
      error: (err)=>{
        console.log('error',err);
        this.snackBar.open('Acceso Incorrecto', 'Ok', {
          duration: 3000
        });},
      complete:()=>console.log('👍 Acceso Correcto')
    });

  }

}