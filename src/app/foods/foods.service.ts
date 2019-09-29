import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { FoodClass } from './classes/food';
import { FoodInterface } from '../shared/interfaces/food';
import {TenantsService} from '../tenants/tenants.service';

@Injectable()
export class FoodsService {

  apiUrl = `https://localhost:8443`;
  resource = `/foods`;
  foods: Array<FoodInterface>;
  foodsBehaviorSubject: BehaviorSubject<FoodInterface[]> = new BehaviorSubject(<FoodInterface[]> this.foods);
  food: FoodInterface;
  foodSubject: BehaviorSubject<FoodInterface> = new BehaviorSubject<FoodInterface>(this.food);


  constructor(private http: HttpClient,
              private tenantsService: TenantsService) {
    this.tenantsService.currentTenantIDBehaviourSubject.subscribe(() => {
      this.getFoods().subscribe((foods: Array<FoodInterface>) => {
        this.foods = foods;
        this.broadcastFoods();
      });
    });
  }

  getFoods() {
      // console.log('getting foods');
      const callUrl = `${this.apiUrl}${this.resource}`;
      return this.http.get(callUrl).pipe(map((response: any) => response.data));
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

  deleteFood(food: FoodInterface) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    return this.http.delete(`${callUrl}/${food._id}`)
        .pipe(map(response => {
          this.getFoods();
          return response;
        }));
  }

  updateFood(food: FoodInterface) {
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
