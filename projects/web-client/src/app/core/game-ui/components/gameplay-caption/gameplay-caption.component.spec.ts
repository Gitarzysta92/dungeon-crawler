import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameplayCaptionComponent } from './gameplay-caption.component';

describe('GameplayCaptionComponent', () => {
  let component: GameplayCaptionComponent;
  let fixture: ComponentFixture<GameplayCaptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameplayCaptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
