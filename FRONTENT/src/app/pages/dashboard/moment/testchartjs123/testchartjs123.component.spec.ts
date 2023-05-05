import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testchartjs123Component } from './testchartjs123.component';

describe('Testchartjs123Component', () => {
  let component: Testchartjs123Component;
  let fixture: ComponentFixture<Testchartjs123Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Testchartjs123Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testchartjs123Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
