import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenuButtonComponent } from './mobile-menu-button.component';

describe('MobileMenuButtonComponent', () => {
  let component: MobileMenuButtonComponent;
  let fixture: ComponentFixture<MobileMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
