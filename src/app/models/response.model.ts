import { Person } from "./person.model";

export class Response {
    status : string;
    message : string;
    person : Person;
    constructor(status : string, message : string, person : Person){
        this.status = status;
        this.message = message;
        this.person = person;
    }
}
