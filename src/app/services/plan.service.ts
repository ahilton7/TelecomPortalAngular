import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  url = 'https://telecomprojectapi20211020151612.azurewebsites.net/api/Plans';

  constructor(private httpClient: HttpClient) { }

  findAll(personId: Number): Observable<Plan[]> {
    return this.httpClient.get<Plan[]>(this.url + "?personId=" + personId);
  }

  find(plan: Plan): Observable<Plan> {
    return this.httpClient.get<Plan>(this.url + `/${plan.id}`);
  }

  save(plan: Plan): Observable<number> {
    return this.httpClient.post<number>(this.url, plan);
  }
}