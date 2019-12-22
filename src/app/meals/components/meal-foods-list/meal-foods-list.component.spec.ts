import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealFoodsListComponent } from './meal-foods-list.component';

describe('MealFoodsListComponent', () => {
  let component: MealFoodsListComponent;
  let fixture: ComponentFixture<MealFoodsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealFoodsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealFoodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
