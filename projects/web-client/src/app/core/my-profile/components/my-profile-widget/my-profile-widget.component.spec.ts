import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileWidgetComponent } from './my-profile-widget.component';

describe('MyProfileWidgetComponent', () => {
  let component: MyProfileWidgetComponent;
  let fixture: ComponentFixture<MyProfileWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
