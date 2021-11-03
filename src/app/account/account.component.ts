import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';
import { Device } from '../models/device.model';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  personId: any;
  person!: Person;
  DeviceList: Device[] = [];

  constructor(private personService: PersonService, private deviceService: DeviceService, private activeRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activeRoute.data.subscribe(id => {
        this.personId = id;
        this.personService.find(this.personId).subscribe(data => {
            this.person = data;
        });
    });
    this.activeRoute.data.subscribe(data => {
        this.deviceService.findAll().subscribe(data => {
            this.DeviceList = data;
        });
    });
  }
}
