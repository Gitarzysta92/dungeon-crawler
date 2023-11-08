import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAreaViewComponent } from './building-area-view.component';

describe('BuildingAreaViewComponent', () => {
  let component: BuildingAreaViewComponent;
  let fixture: ComponentFixture<BuildingAreaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingAreaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingAreaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
