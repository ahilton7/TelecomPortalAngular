import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  PersonList: Person[] = [];

  constructor(private personService: PersonService, private router: Router) { }
  
  ngOnInit(): void {
    //calls to an observable do not happen until subscribe is called
    this.personService.findAll().subscribe(data => {
      this.PersonList = data;
      console.log(this.PersonList);
    });
  }
}
