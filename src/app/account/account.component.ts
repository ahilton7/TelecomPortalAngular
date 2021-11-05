import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';
import { Device } from '../models/device.model';
import { DeviceService } from '../services/device.service';
import { Plan } from '../models/plan.model';
import { PlanService } from '../services/plan.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  switch: Boolean = true;
  table: any;
  row: any;
  personId: any;
  person!: Person;
  device!: Device;
  DeviceList: Device[] = [];
  PlanList: Plan[] = [];

  constructor(private personService: PersonService, private deviceService: DeviceService, private planService: PlanService, private activeRoute: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.activeRoute.data.subscribe(id => {
        this.personId = id;
        this.personService.find(this.personId).subscribe(data => {
            this.person = data;
        });
    });
  }

  updateDevice(): void {
    this.activeRoute.data.subscribe(id => {
      this.personId = id;
      this.deviceService.findAll(this.personId.id).subscribe(data => {
          this.DeviceList = data;
      });
    });
  }

  deleteDevice(device: Device): void {
    this.activeRoute.data.subscribe(id => {
      this.device = device;
      this.deviceService.delete(this.device.id).subscribe(data => {
        this.device = data;
      });
    });
  }

  updatePlans(): void {
    this.activeRoute.data.subscribe(id => {
      this.personId = id;
      this.planService.findAll(this.personId.id).subscribe(data => {
          this.PlanList = data;
      });
    });
  }

  addDevice(): void {
    this.activeRoute.data.subscribe(id => {
      this.personId = id;
      this.device = new Device("Apple", 2223335555, this.personId.id, 1);
      this.deviceService.save(this.device).subscribe(data => {
          this.device = data;
      });
    });
    document.getElementById('addButton')!.innerText = 'Add Device';
  }

  addEmptyrow(): void {
    this.table = document.getElementById('devices-list');
    this.row = this.table.insertRow(2);
    this.row.insertCell(0).innerHTML+='<input type="text">';
    this.row.insertCell(1).innerHTML+='<input type="text">';
    this.row.insertCell(2).innerHTML+='<input type="text">';
    document.getElementById('addButton')!.innerText = 'Save';
  }

  addSwitch(): void {
    if(this.switch) this.addEmptyrow();
    else this.addDevice();
    this.switch = !this.switch;
  }
}
