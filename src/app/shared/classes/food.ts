export class Food {
    _id: string;
    name: string;
    measurement: string;
    constructor(_id: string, name: string, measurement: string) {
        this._id = _id;
        this.name = name;
        this.measurement = measurement;
    }
}
