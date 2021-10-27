import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Login } from '../interfaces/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: Login = { userId: "admin", password: "password"}
  message: string = "test";
  returnUrl: string = "test";
  loginForm: FormGroup = this.formBuilder.group({
    userId: ['', Validators.required],
    possword: ['', Validators.required]
  });

  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private authService : AuthService
  ) { 
  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      possword: ['', Validators.required]
    });
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }

  get f() {return this.loginForm.controls;}
 
  login(){
    if(this.loginForm.invalid){
      return;
    }
    else{
      if(this.f.userId.value == this.model.userId && this.f.password.value == this.model.password){
        console.log("Login Successful");

        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.userId.value);
        this.router.navigate([this.returnUrl]);
      }
      else{
        this.message = "Please check your Name and Password";
      }
    }
  }

}
