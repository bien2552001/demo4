import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestchartTodayComponent } from './testchart-today.component';

describe('TestchartTodayComponent', () => {
  let component: TestchartTodayComponent;
  let fixture: ComponentFixture<TestchartTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestchartTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestchartTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
