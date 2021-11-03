import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  url = 'https://telecomprojectapi20211020151612.azurewebsites.net/api/Devices';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Device[]> {
    return this.httpClient.get<Device[]>(this.url);
  }

  find(device: Device): Observable<Device> {
    return this.httpClient.get<Device>(this.url + `/${device.id}`);
  }

  save(device: Device): Observable<number> {
    return this.httpClient.post<number>(this.url, device);
  }
}