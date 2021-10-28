export class Person {
    id: number = 0;
    name: string;
    password: string;

    constructor(name:string, password:string) {
        this.name = name;
        this.password = password;
    }
}
