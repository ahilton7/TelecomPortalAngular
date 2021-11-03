import { Device } from '../models/device.model';

export class Person {
    id: number = 0;
    name: string;
    password: string;
    devices: Device[];

    constructor(name:string, password:string, devices:Device[]) {
        this.name = name;
        this.password = password;
        this.devices = devices;
    }
}
