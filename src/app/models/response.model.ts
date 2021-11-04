

export class Response {
    status : string;
    message : string;
    userId : any;
    constructor(status : string, message : string, userId : any){
        this.status = status;
        this.message = message;
        this.userId = userId;

    }
}
