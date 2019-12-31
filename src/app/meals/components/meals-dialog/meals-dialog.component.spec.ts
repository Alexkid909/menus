import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsDialogComponent } from './meals-dialog.component';

describe('MealsDialogComponent', () => {
  let component: MealsDialogComponent;
  let fixture: ComponentFixture<MealsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
