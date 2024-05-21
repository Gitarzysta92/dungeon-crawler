import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaLabelComponent } from './area-label.component';

describe('AreaLabelComponent', () => {
  let component: AreaLabelComponent;
  let fixture: ComponentFixture<AreaLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
