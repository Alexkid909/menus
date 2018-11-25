import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodActionsComponent } from './food-actions.component';

describe('FoodActionsComponent', () => {
  let component: FoodActionsComponent;
  let fixture: ComponentFixture<FoodActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
