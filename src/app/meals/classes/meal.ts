export class Meal {
    _id: string;
    name: string;
    foods?: Array<any>;
    constructor(_id: string, name: string) {
        this._id = _id;
        this.name = name;
    }
}
