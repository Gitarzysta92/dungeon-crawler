import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratedInputComponent } from './integrated-input.component';

describe('IntegratedInputComponent', () => {
  let component: IntegratedInputComponent;
  let fixture: ComponentFixture<IntegratedInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegratedInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegratedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
