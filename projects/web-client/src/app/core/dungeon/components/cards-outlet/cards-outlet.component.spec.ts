import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsOutletComponent } from './cards-outlet.component';

describe('CardsOutletComponent', () => {
  let component: CardsOutletComponent;
  let fixture: ComponentFixture<CardsOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsOutletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
