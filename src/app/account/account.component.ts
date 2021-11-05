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
  x!: any;
  y!: any;
  z!: any;
  table: any;
  row: any;
  personId: any;
  person!: Person;
  device!: Device;
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



  addEmptyrow(): void {
    this.table = document.getElementById('devices-list');
    this.row = this.table.insertRow(2);
    this.row.insertCell(0).innerHTML+='<input id="random1" type="text">';
    this.row.insertCell(1).innerHTML+='<input id="random2" type="text">';
    this.row.insertCell(2).innerHTML+='<input id="random3" type="text">';
    document.getElementById('addButton')!.innerText = 'Save';
  }

  addSwitch(): void {
    if(this.switch) this.addEmptyrow();
    else this.addDevice();
    this.switch = !this.switch;
  }

}
