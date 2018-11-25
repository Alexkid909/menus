import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Food} from './classes/food';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FoodsService {

  apiUrl = `http://localhost:3001`;
  resource = `/foods`;
  headers = new HttpHeaders({
      'type': 'application/**json',
      'responseType': 'text'
  });
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
      const options = {
          headers: this.headers
      };
      return this.http.get(callUrl, options).subscribe((food: Food) => {
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
    const options = {
      headers: this.headers
    };
    console.log(name);
    return this.http.post(callUrl, body, options).map(response => {
        this.getFoods();
        return response;
    });
  }
  deleteFood(food: Food) {
      const callUrl = `${this.apiUrl}${this.resource}`;

      const options = {
        headers: this.headers
    };
    return this.http.delete(`${callUrl}/${food._id}`, options)
        .map(response => {
          this.getFoods();
          return response;
        });
  }
  updateFood(food: Food) {
      const callUrl = `${this.apiUrl}${this.resource}/${food._id}`;
      console.log(food);
      const body = food;
      const options = {
          headers: this.headers
      };
      return this.http.put(callUrl, body, options).map(response => {
          this.getFoods();
          return response;
      });
  }
}
