import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  PersonList: Person[] = [];
  message: string = "test";
  returnUrl: string = "account/:";
  response: Response = new Response("","", 0);
  loginForm: FormGroup = this.formBuilder.group({
    userId: ['', Validators.required],
    password: ['', Validators.required]
  });
  userLogin!: Login;

  constructor(
    private personService: PersonService,
    private formBuilder : FormBuilder,
    private router : Router,
    private authService : AuthService
  ) { 
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.personService.findAll().subscribe(data => {
        this.PersonList = data;
    });
  }

  details(person: Person): void {
    let route = this.router.config.find(r => r.path === 'account/:name');
    if (route) {
      route.data = person;
      this.router.navigateByUrl(`/account/${person.name}`);
    }
  }

  login(data: { userId: string; password: string; }){
    if(this.loginForm.invalid){
      return;
    } 
    this.userLogin = new Login(data.userId, data.password);
    this.authService.getResponse(this.userLogin).subscribe((data) =>{
      this.response.status = data.status;
      this.response.message = data.message;
    },
      error => console.log(error)
    )
    if(this.response.status == "1"){
      let route = this.router.config.find(r => r.path === 'account/:name');
      if (route) {
        route.data = this.personService.find(this.response.userId);
        this.router.navigateByUrl(`/account/${this.response.message}`);
      } 
    } else{
      this.message = "wrong username or password";
    }
  }
}
