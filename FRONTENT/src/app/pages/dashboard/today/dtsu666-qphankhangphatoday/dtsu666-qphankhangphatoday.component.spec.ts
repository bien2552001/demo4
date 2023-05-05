import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666QphankhangphatodayComponent } from './dtsu666-qphankhangphatoday.component';

describe('Dtsu666QphankhangphatodayComponent', () => {
  let component: Dtsu666QphankhangphatodayComponent;
  let fixture: ComponentFixture<Dtsu666QphankhangphatodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666QphankhangphatodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666QphankhangphatodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
