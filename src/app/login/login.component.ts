import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Login } from '../interfaces/login';
import { AuthService } from '../services/auth.service';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  PersonList: Person[] = [];
  model: Login = { userId: "admin", password: "password"}
  message: string = "test";
  returnUrl: string = "test";
  loginForm: FormGroup = this.formBuilder.group({
    userId: ['', Validators.required],
    possword: ['', Validators.required]
  });

  constructor(
    private personService: PersonService,
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
    this.personService.findAll().subscribe(data => {
        this.PersonList = data;
    });
  }

  details(person: Person): void {
    let route = this.router.config.find(r => r.path === 'account/:id');
    if (route) {
      route.data = person;
      this.router.navigateByUrl(`/account/${person.id}`);
    }
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
