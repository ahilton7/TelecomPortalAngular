export class Plan {
    id: number = 0;
    device_limit: number;
    cost: number;
    name: string;
    personId: number;

    constructor(device_limit:number, cost:number, name:string, personId:number) {
        this.device_limit = device_limit;
        this.cost = cost;
        this.name = name;
        this.personId = personId;
    }
}