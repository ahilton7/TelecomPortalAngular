import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url = 'https://telecomprojectapi20211020151612.azurewebsites.net/api/People';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.url);
  }

  find(personId: any): Observable<Person> {
    return this.httpClient.get<Person>(this.url + `/${personId.id}`);
  }

  save(person: Person): Observable<number> {
    return this.httpClient.post<number>(this.url, person);
  }
}