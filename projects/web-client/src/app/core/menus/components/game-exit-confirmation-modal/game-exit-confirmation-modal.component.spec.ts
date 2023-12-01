import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExitConfirmationModalComponent } from './game-exit-confirmation-modal.component';

describe('GameExitConfirmationModalComponent', () => {
  let component: GameExitConfirmationModalComponent;
  let fixture: ComponentFixture<GameExitConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameExitConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameExitConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
