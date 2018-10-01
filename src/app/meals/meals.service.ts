import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Meal} from './classes/meal';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class MealsService {

  apiUrl = `http://localhost:3001`;
  resource = `/meals`;
  headers = new HttpHeaders({
      'type': 'application/**json',
      'responseType': 'text'
  });
  mealsList: Array<Meal>;
  mealsSubject: BehaviorSubject<Meal[]> = new BehaviorSubject(<Meal[]> this.mealsList);
  meal: Meal;
  mealSubject: BehaviorSubject<Meal> = new BehaviorSubject<Meal>(this.meal);


  constructor(private http: HttpClient) {
    this.getMeals();
  }

  getMeals() {
    const callUrl = `${this.apiUrl}${this.resource}`;
    this.http.get(callUrl).subscribe((mealsList: Array<Meal>) => {
          this.mealsList = mealsList;
          this.mealsSubject.next(this.mealsList);
        });
  }

  getMeal(id) {
      const callUrl = `${this.apiUrl}${this.resource}/${id}`;
      const options = {
          headers: this.headers
      };
      return this.http.get(callUrl, options).subscribe((meal: Meal) => {
         this.meal = meal;
         this.mealSubject.next(this.meal);
      });
  }

  createMeal(name) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    const body =  {
      name
    };
    const options = {
      headers: this.headers
    };
    console.log(name);
    return this.http.post(callUrl, body, options).map(response => {
        this.getMeals();
        return response;
    });
  }
  deleteMeal(meal: Meal) {
      const callUrl = `${this.apiUrl}${this.resource}`;

      const options = {
        headers: this.headers
    };
    return this.http.delete(`${callUrl}/${meal._id}`, options)
        .map(response => {
          this.getMeals();
          return response;
        });
  }
  updateMeal(meal: Meal) {
      const callUrl = `${this.apiUrl}${this.resource}/${meal._id}`;
      console.log(meal);
      const body =  {
          name: meal.name
      };
      const options = {
          headers: this.headers
      };
      return this.http.put(callUrl, body, options).map(response => {
          this.getMeals();
          return response;
      });
  }
}
