import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactSubItemComponent } from './artifact-sub-item.component';

describe('ArtifactSubItemComponent', () => {
  let component: ArtifactSubItemComponent;
  let fixture: ComponentFixture<ArtifactSubItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactSubItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactSubItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
