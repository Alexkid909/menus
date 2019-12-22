import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { MealClass } from './classes/meal.class';
import { TenantsService } from '../tenants/tenants.service';
import { MealInterface } from '../shared/interfaces/meal.interface';
import {MealFoodClass} from './classes/meal-food.class';

@Injectable()
export class MealsService {

  apiUrl = `https://localhost:49161`;
  resource = `/meals`;
  meals: Array<MealInterface>;
  mealsBehaviorSubject: BehaviorSubject<MealInterface[]> = new BehaviorSubject(<MealInterface[]> this.meals);
  meal: MealInterface;
  mealSubject: BehaviorSubject<MealInterface> = new BehaviorSubject<MealInterface>(this.meal);


  constructor(private http: HttpClient,
              private tenantsService: TenantsService) {
    this.tenantsService.currentTenantIDBehaviourSubject.subscribe((id: string) => {
      if (id) { this.getMeals(); }
    });
  }

  private getMeals() {
    this.http.get(`${this.apiUrl}${this.resource}`).subscribe((response: any) => {
      this.meals = response.data;
      this.broadcastMeals();
    });
  }

  broadcastMeals() {
    this.mealsBehaviorSubject.next(this.meals);
  }

  getMeal(id) {
    const callUrl = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.get(callUrl).subscribe((meal: MealInterface) => {
      this.meal = meal;
      this.mealSubject.next(this.meal);
    });
  }

  createMeal(name) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    const body = new MealClass(name);
    console.log(name);
    return this.http.post(callUrl, body).pipe(map(response => {

      this.getMeals();
      return response;
    }));
  }

  deleteMeal(mealId: string) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    return this.http.delete(`${callUrl}/${mealId}`)
      .pipe(map(response => {
        this.getMeals();
        return response;
      }));
  }

  updateMeal(mealId: string, meal: MealClass) {
    const callUrl = `${this.apiUrl}${this.resource}/${mealId}`;
    const body = meal;
    return this.http.put(callUrl, body).pipe(map(response => {
      this.getMeals();
      return response;
    }));
  }

  addFoodsToMeal(mealID: string, mealFoods: Array<MealFoodClass>) {
    const callUrl = `${this.apiUrl}${this.resource}/${mealID}/foods`;
    const body = mealFoods.map((mealFood: MealFoodClass) => {
      return {
        foodId: mealFood.food._id,
        qty: mealFood.qty
      };
    });
    return this.http.post(callUrl, body);
  }

  getMealFoods(mealId: string) {
    const callUrl = `${this.apiUrl}${this.resource}/${mealId}/foods`;
    return this.http.get(callUrl);
  }
}
