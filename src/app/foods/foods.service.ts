import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { FoodClass } from './classes/food.class';
import { FoodInterface } from '../shared/interfaces/food.interface';
import {TenantsService} from '../tenants/tenants.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class FoodsService {

  apiUrl = `https://localhost:49161`;
  resource = `/foods`;
  foods: Array<FoodInterface>;
  foodsBehaviorSubject: BehaviorSubject<FoodInterface[]> = new BehaviorSubject(<FoodInterface[]> this.foods);
  food: FoodInterface;
  foodSubject: BehaviorSubject<FoodInterface> = new BehaviorSubject<FoodInterface>(this.food);


  constructor(private http: HttpClient,
              private tenantsService: TenantsService) {
    this.tenantsService.currentTenantIDBehaviourSubject.subscribe((id: string) => {
      if (id) { this.getFoods(); }
    });
  }

  private getFoods() {
      this.http.get(`${this.apiUrl}${this.resource}`).subscribe((response: any) => {
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

  createFood(name, measurement) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    const body = new FoodClass(name, measurement);
    console.log(name);
    return this.http.post(callUrl, body).pipe(map(response => {

        this.getFoods();
        return response;
    }));
  }

  deleteFood(foodId: string) {
    const callUrl = `${this.apiUrl}${this.resource}`;
    return this.http.delete(`${callUrl}/${foodId}`)
        .pipe(map(response => {
          this.getFoods();
          return response;
        }));
  }

  updateFood(foodId: string, food: FoodClass) {
      const callUrl = `${this.apiUrl}${this.resource}/${foodId}`;
      const body = food;
      return this.http.put(callUrl, body).pipe(map(response => {
          this.getFoods();
          return response;
      }));
  }
}
