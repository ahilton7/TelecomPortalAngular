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

  totalCost: number = 0;
  switch: Boolean = true;
  table: any;
  row: any;
  personId: any;
  person!: Person;
  device: Device = new Device("",0,0,0);
  plan!: Plan;
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

  deletePlan(plan: Plan): void {
    this.activeRoute.data.subscribe(id => {
      this.plan = plan;
      this.planService.delete(this.plan.id).subscribe(data => {
        this.plan = data;
      });
    });
  }

  updatePlans(): void {
    this.activeRoute.data.subscribe(id => {
      this.personId = id;
      this.planService.findAll(this.personId.id).subscribe(data => {
          this.PlanList = data;
          this.totalCost = 0;
          this.PlanList.forEach(element =>
              this.totalCost = this.totalCost + element.cost
            )
      });
    });
  }

  addDevice(): void {
<<<<<<< HEAD
    //this.device = new Device("Samsung", 123456478, 1, 3)
    this.device.personId = 1;
=======
    this.device = new Device("Samsung", 123452278, 1, 3)
>>>>>>> 860187a5205c4e2cea3c416a73aa4cf9393106ea
    this.deviceService.save(this.device).subscribe(data => {

      let route = this.router.config.find(r => r.path === 'account/:name');
      if (route) {
        this.router.navigateByUrl('/devices');
      }
    });
    this.table = document.getElementById('devices-list');
    this.row = this.table.deleteRow(2);
    document.getElementById('addButton')!.innerText = 'Add Device';
  }


  addEmptyrow(): void {
    this.table = document.getElementById('devices-list');
    this.row = this.table.insertRow(2);
    this.row.insertCell(0).innerHTML+='<input [(ngModel)] = "device.phone_type" #phone_type = "ngModel" type="text">';
    this.row.insertCell(1).innerHTML+='<input [(ngModel)] = "device.phone_number" #phone_number = "ngModel" type="number">';
    this.row.insertCell(2).innerHTML+='<input [(ngModel)] = "device.planId" #planId = "ngModel" type="number">';
    document.getElementById('addButton')!.innerText = 'Save';
  }

  addSwitch(): void {
    if(this.switch) this.addEmptyrow();
    else this.addDevice();
    this.switch = !this.switch;
  }

}
