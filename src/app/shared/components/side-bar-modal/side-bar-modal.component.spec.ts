import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarModalComponent } from './side-bar-modal.component';

describe('SideBarComponent', () => {
  let component: SideBarModalComponent;
  let fixture: ComponentFixture<SideBarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
