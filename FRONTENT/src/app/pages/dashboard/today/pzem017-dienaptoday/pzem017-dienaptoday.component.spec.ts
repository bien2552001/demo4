import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pzem017DienaptodayComponent } from './pzem017-dienaptoday.component';

describe('Pzem017DienaptodayComponent', () => {
  let component: Pzem017DienaptodayComponent;
  let fixture: ComponentFixture<Pzem017DienaptodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pzem017DienaptodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pzem017DienaptodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
