import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersOrderComponent } from './players-order.component';

describe('PlayersOrderComponent', () => {
  let component: PlayersOrderComponent;
  let fixture: ComponentFixture<PlayersOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
