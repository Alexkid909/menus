import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealFoodsComponent } from './meal-foods.component';

describe('MealFoodsComponent', () => {
  let component: MealFoodsComponent;
  let fixture: ComponentFixture<MealFoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealFoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
