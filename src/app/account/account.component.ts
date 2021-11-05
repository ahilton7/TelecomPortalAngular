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
  switch2: Boolean = true;
  x!: any;
  y!: any;
  z!: any;
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

    this.table = document.getElementById('devices-list');
    this.x = (<HTMLInputElement>document.getElementById('random1'))!.value;
    this.y = (<HTMLInputElement>document.getElementById('random2'))!.value;
    this.z = (<HTMLInputElement>document.getElementById('random3'))!.value;
    this.device = new Device(this.x, this.y, this.personId.id, this.z)
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

  addPlan(): void {

    this.table = document.getElementById('plans-list');
    this.x = (<HTMLInputElement>document.getElementById('random4'))!.value;
    if (this.x == "PlanOne")
    {
      this.plan = new Plan(3, 14.99, 'PlanOne', this.personId.id)
    }
    if (this.x == "PlanTwo")
    {
      this.plan = new Plan(5, 19.99, 'PlanTwo', this.personId.id)
    }
    if (this.x == "PlanThree")
    {
      this.plan = new Plan(7, 29.99, 'PlanThree', this.personId.id)
    }
    this.planService.save(this.plan).subscribe(data => {

      let route = this.router.config.find(r => r.path === 'account/:name');
      if (route) {
        this.router.navigateByUrl('/plans');
      }
    });
    this.table = document.getElementById('plans-list');
    this.row = this.table.deleteRow(2);
    document.getElementById('addButton2')!.innerText = 'Add Plan';
  }


  addEmptyrow(): void {
    this.table = document.getElementById('devices-list');
    this.row = this.table.insertRow(2);
    this.row.insertCell(0).innerHTML+='<input id="random1" type="text">';
    this.row.insertCell(1).innerHTML+='<input id="random2" type="text">';
    this.row.insertCell(2).innerHTML+='<input id="random3" type="text">';
    document.getElementById('addButton')!.innerText = 'Save';
  }

  addEmptyrow2(): void {
    this.table = document.getElementById('plans-list');
    this.row = this.table.insertRow(2);
    this.row.insertCell(0).innerHTML+='';
    this.row.insertCell(1).innerHTML+='<input id="random4" type="text">';
    this.row.insertCell(2).innerHTML+='';
    this.row.insertCell(3).innerHTML+='';
    this.row.insertCell(4).innerHTML+='';
    document.getElementById('addButton2')!.innerText = 'Save';
  }

  addSwitch(): void {
    if(this.switch) this.addEmptyrow();
    else this.addDevice();
    this.switch = !this.switch;
  }

  addSwitch2(): void {
    if(this.switch2) this.addEmptyrow2();
    else this.addPlan();
    this.switch2 = !this.switch2;
  }

}
