import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import {Meal} from './classes/meal';
import {MealFood} from './interfaces/meal-food';

@Injectable()
export class MealsService {

  apiUrl = `http://localhost:3001`;
  mealsResource = `/meals`;
  mealFoodsResource = `/meal-foods`;
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
    const callUrl = `${this.apiUrl}${this.mealsResource}`;
    let params = new HttpParams();
    params = params.set('includeFoods', 'true');
    this.http.get(callUrl, { params }).subscribe((mealsList: Array<Meal>) => {
          this.mealsList = mealsList;
          this.mealsSubject.next(this.mealsList);
        });
  }

  getMeal(id: string) {
      const callUrl = `${this.apiUrl}${this.mealsResource}/${id}`;
      const options = {
          headers: this.headers
      };
      return this.http.get(callUrl, options).subscribe((meal: Meal) => {
         this.meal = meal;
         this.mealSubject.next(this.meal);
      });
  }

  createMeal(name: string) {
    const callUrl = `${this.apiUrl}${this.mealsResource}`;
    const foods = [];
    const body =  {
      name,
      foods
    };
    const options = {
      headers: this.headers
    };
    console.log('body', body);
    return this.http.post(callUrl, body, options).pipe(map(response => {
        this.getMeals();
        return response;
    }));
  }

  deleteMeal(meal: Meal) {
      const callUrl = `${this.apiUrl}${this.mealsResource}`;

      const options = {
        headers: this.headers
    };
    return this.http.delete(`${callUrl}/${meal._id}`, options)
        .pipe(map(response => {
          this.getMeals();
          return response;
        }));
  }

  updateMeal(meal: Meal) {
      const callUrl = `${this.apiUrl}${this.mealsResource}/${meal._id}`;
      console.log(meal);
      const body =  {
          name: meal.name
      };
      const options = {
          headers: this.headers
      };
      return this.http.put(callUrl, body, options).pipe(map(response => {
          this.getMeals();
          return response;
      }));
  }
  updateMealFoods(mealId: string, mealFood: MealFood) {
    const callUrl = `${this.apiUrl}${this.mealsResource}/${mealId}/foods`;

    const body = {
      mealFood:  {
          foodId: mealFood._id,
          qty: mealFood.qty
      }
    };

    const options = {
      headers: this.headers
    };

    return this.http.post(callUrl, body, options).pipe(map(response => {
      this.getMeals();
      return response;
    }));
  }

  getMealFoods(mealId: string) {
    console.log('getting meal foods', mealId);
    const callUrl = `${this.apiUrl}${this.mealsResource}/${mealId}/foods`;
    return this.http.get(callUrl);
  }

  deleteMealFood(mealFood: MealFood) {
    const callUrl = `${this.apiUrl}${this.mealFoodsResource}/${mealFood._id}`;
    return this.http.delete(callUrl);
  }
}
