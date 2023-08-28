import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileViewComponent } from './my-profile-view.component';

describe('MyProfileViewComponent', () => {
  let component: MyProfileViewComponent;
  let fixture: ComponentFixture<MyProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
