import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { FoodClass } from './classes/food.class';
import { FoodInterface } from '../shared/interfaces/food.interface';
import {TenantsService} from '../tenants/tenants.service';
import {Observable} from 'rxjs';
import { environment} from '../../environments/environment';
import {NotificationsService} from '../shared/notifications.service';
import {ErrorService} from '../shared/error.service';
import {Notification} from '../shared/classes/notification';
import {NotificationType} from '../shared/interfaces/notification';
import {SortOrder} from '../shared/classes/sort-order';

@Injectable()
export class FoodsService {

  apiUrl: string;
  resource = `/foods`;
  foods: Array<FoodInterface>;
  foodsBehaviorSubject: BehaviorSubject<FoodInterface[]>;
  food: FoodInterface;
  foodSubject: BehaviorSubject<FoodInterface>;
  sortOrder: SortOrder;

  constructor(private http: HttpClient,
              private tenantsService: TenantsService,
              private notificationsService: NotificationsService,
              private errorService: ErrorService
  ) {
    this.foodsBehaviorSubject = new BehaviorSubject<FoodInterface[]>(this.foods);
    this.foodSubject = new BehaviorSubject<FoodInterface>(this.food);
    this.apiUrl = environment.apiUrl;
    this.tenantsService.currentTenantIDBehaviourSubject.subscribe((id: string) => {
      if (id) { this.getFoods(); }
    });
  }


  private getFoods() {
    let params = new HttpParams();

    if (this.sortOrder) {
      params = params
        .set('sortKey', this.sortOrder.key)
        .set('sortOrder', this.sortOrder.order.toString());
    }

    this.http.get(`${this.apiUrl}${this.resource}`, { params }).subscribe((response: any) => {
      this.foods = response.data;
      this.broadcastFoods();
    });
  }

  public searchFoods(term: string): Observable<Array<FoodInterface>> {
    return this.http.get(`${this.apiUrl}/foods/`).pipe(map((results: any) => {
      const searchResults = !term ? [] : results.data.filter((result: FoodInterface) => {
        return result.name.toLowerCase().includes(term.toLowerCase());
      });
      return searchResults;
    }));
  }

  broadcastFoods() {
    this.foodsBehaviorSubject.next(this.foods);
  }

  getFood(id) {
      const callUrl = `${this.apiUrl}${this.resource}/${id}`;
      return this.http.get(callUrl).subscribe((food: FoodInterface) => {
         this.food = food;
         this.foodSubject.next(this.food);
      });
  }

  createFood(food: FoodClass) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    return this.http.post(callUrl, food)
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(response => {
        this.getFoods();
        const notification = new Notification(NotificationType.Success, 'Well done you have created a new food', 'Food Created');
        this.notificationsService.newNotification(notification);
        return response;
      }));
  }

  deleteFood(foodId: string) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    return this.http.delete(`${callUrl}/${foodId}`)
      .pipe(catchError(this.errorService.handleError))
      .pipe(map(response => {
        this.getFoods();
        const notification = new Notification(NotificationType.Success, 'Well done you have deleted a food', 'Food Deleted');
        this.notificationsService.newNotification(notification);
        return response;
      }));
  }

  updateFood(foodId: string, food: FoodClass) {
      const callUrl = `${this.apiUrl}${this.resource}/${foodId}`;
      const body = food;
      return this.http.put(callUrl, body)
        .pipe(catchError(this.errorService.handleError))
        .pipe(map(response => {
          const notification = new Notification(NotificationType.Success, 'Well done you have updated the food', 'Food Updated');
          this.notificationsService.newNotification(notification);
          this.getFoods();
          return response;
        }));
  }

  sortFoods(sortOrder: SortOrder) {
    this.sortOrder = sortOrder;
    this.getFoods();
  }
}
