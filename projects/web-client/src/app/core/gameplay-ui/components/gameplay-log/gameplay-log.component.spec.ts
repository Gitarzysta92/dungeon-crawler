import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameplayLogComponent } from './gameplay-log.component';

describe('GameplayLogComponent', () => {
  let component: GameplayLogComponent;
  let fixture: ComponentFixture<GameplayLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameplayLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
