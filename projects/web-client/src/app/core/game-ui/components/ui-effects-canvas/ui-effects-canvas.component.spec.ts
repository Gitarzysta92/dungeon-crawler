import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiEffectsCanvasComponent } from './ui-effects-canvas.component';

describe('UiEffectsCanvasComponent', () => {
  let component: UiEffectsCanvasComponent;
  let fixture: ComponentFixture<UiEffectsCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiEffectsCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiEffectsCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
