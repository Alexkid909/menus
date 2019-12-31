import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarDialogComponent } from './side-bar-dialog.component';

describe('SideBarDialogComponent', () => {
  let component: SideBarDialogComponent;
  let fixture: ComponentFixture<SideBarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
