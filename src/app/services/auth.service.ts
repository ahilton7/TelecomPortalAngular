import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Response } from '../models/response.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://telecomprojectapi20211020151612.azurewebsites.net/api/People/login';
  constructor(private httpClient: HttpClient) { }
  
  getResponse(login:Login): Observable<Response>{

    return this.httpClient.post<Response>(this.url, login);

  }
}
