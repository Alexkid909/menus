import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealActionsComponent } from './meal-actions.component';

describe('MealActionsComponent', () => {
  let component: MealActionsComponent;
  let fixture: ComponentFixture<MealActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
