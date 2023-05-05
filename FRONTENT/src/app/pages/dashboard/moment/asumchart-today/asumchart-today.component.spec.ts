import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsumchartTodayComponent } from './asumchart-today.component';

describe('AsumchartTodayComponent', () => {
  let component: AsumchartTodayComponent;
  let fixture: ComponentFixture<AsumchartTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsumchartTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsumchartTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
