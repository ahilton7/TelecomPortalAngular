export class Device {
    id: number = 0;
    phone_type: string;
    phone_number: number;
    personId: number;
    planId: number;

    constructor(phone_type:string, phone_number:number, personId:number, planId:number) {
        this.phone_type = phone_type;
        this.phone_number = phone_number;
        this.personId = personId;
        this.planId = planId;
    }
}
