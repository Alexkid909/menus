export class FoodClass {
    name: string;
    measurement: string;
    imgSrc?: string;
    constructor(name: string, measurement: string, imgSrc?: string) {
        this.name = name;
        this.measurement = measurement;
        this.imgSrc = imgSrc;
    }
}
