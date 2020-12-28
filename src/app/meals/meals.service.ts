import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { MealClass } from './classes/meal.class';
import { TenantsService } from '../tenants/tenants.service';
import { MealInterface } from '../shared/interfaces/meal.interface';
import { MealFoodClass } from './classes/meal-food.class';
import { environment} from '../../environments/environment';
import {NotificationsService} from '../shared/notifications.service';
import {ErrorService} from '../shared/error.service';
import {Notification} from '../shared/classes/notification';
import {NotificationType} from '../shared/interfaces/notification';
import {SortOrder} from '../shared/classes/sort-order';

@Injectable()
export class MealsService {

  apiUrl: string;
  resource = `/meals`;
  meals: Array<MealInterface>;
  mealsBehaviorSubject: BehaviorSubject<MealInterface[]>;
  meal: MealInterface;
  mealSubject: BehaviorSubject<MealInterface>;
  mealsSortOrder: SortOrder;


  constructor(private http: HttpClient,
              private tenantsService: TenantsService,
              private notificationsService: NotificationsService,
              private errorService: ErrorService
  ) {
    this.mealsBehaviorSubject = new BehaviorSubject<MealInterface[]>(this.meals);
    this.mealSubject = new BehaviorSubject<MealInterface>(this.meal);
    this.apiUrl = environment.apiUrl;
    this.tenantsService.currentTenantIDBehaviourSubject.subscribe((id: string) => {
      if (id) { this.getMeals(); }
    });
  }

  private getMeals() {
    let params = new HttpParams();

    if (this.mealsSortOrder) {
      params = params
        .set('sortKey', this.mealsSortOrder.key)
        .set('sortOrder', this.mealsSortOrder.order.toString());
    }
    this.http.get(`${this.apiUrl}${this.resource}`, { params }).subscribe((response: any) => {
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

  createMeal(meal: MealClass) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    return this.http.post(callUrl, meal)
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(response => {
        const notification = new Notification(NotificationType.Success, 'Well done you have created a new meal', 'Meal Created');
        this.notificationsService.newNotification(notification);
        this.getMeals();
        return response;
      }));
  }

  deleteMeal(mealId: string) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    return this.http.delete(`${callUrl}/${mealId}`)
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(response => {
        const notification = new Notification(NotificationType.Success, 'Well done you have deleted a meal', 'Meal Deleted');
        this.notificationsService.newNotification(notification);
        this.getMeals();
        return response;
      }));
  }

  updateMeal(mealId: string, meal: MealClass) {
    const callUrl = `${this.apiUrl}${this.resource}/${mealId}`;
    return this.http.put(callUrl, meal)
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(response => {
        const notification = new Notification(NotificationType.Success, 'Well done you have updated a meal', 'Meal Updated');
        this.notificationsService.newNotification(notification);
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
    return this.http.post(callUrl, body)
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(() => {
        const notification = new Notification(NotificationType.Success, 'Well done you have added a food to this  meal', 'Food Added');
        this.notificationsService.newNotification(notification);
      }));
  }

  getMealFoods(mealId: string) {
    const callUrl = `${this.apiUrl}${this.resource}/${mealId}/foods`;
    return this.http.get(callUrl).pipe(catchError(this.errorService.handleError));
  }

  sortMeals(sortOrder: SortOrder) {
    this.mealsSortOrder = sortOrder;
    this.getMeals();
  }
}
