import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { Food } from '../shared/classes/food';

@Injectable()
export class FoodsService {

  apiUrl = `https://localhost:8443`;
  resource = `/foods`;
  foodsList: Array<Food>;
  foodsSubject: BehaviorSubject<Food[]> = new BehaviorSubject(<Food[]> this.foodsList);
  food: Food;
  foodSubject: BehaviorSubject<Food> = new BehaviorSubject<Food>(this.food);


  constructor(private http: HttpClient) {
    this.getFoods();
  }

  getFoods() {
      console.log('getting foods')
      const callUrl = `${this.apiUrl}${this.resource}`;
      this.http.get(callUrl).subscribe((foodsList: Array<Food>) => {
          this.foodsList = foodsList;
          this.foodsSubject.next(this.foodsList);
      });
  }

  getFood(id) {
      const callUrl = `${this.apiUrl}${this.resource}/${id}`;
      return this.http.get(callUrl).subscribe((food: Food) => {
         this.food = food;
         this.foodSubject.next(this.food);
      });
  }

  createFood(name, measurement) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    const body =  {
        name,
        measurement
    };
    console.log(name);
    return this.http.post(callUrl, body).pipe(map(response => {
        this.getFoods();
        return response;
    }));
  }

  deleteFood(food: Food) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    return this.http.delete(`${callUrl}/${food._id}`)
        .pipe(map(response => {
          this.getFoods();
          return response;
        }));
  }

  updateFood(food: Food) {
      const callUrl = `${this.apiUrl}${this.resource}/${food._id}`;
      console.log(food);
      const body = food;
      delete body._id;
      return this.http.put(callUrl, body).pipe(map(response => {
          this.getFoods();
          return response;
      }));
  }
}
