import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666CosphitodayComponent } from './dtsu666-cosphitoday.component';

describe('Dtsu666CosphitodayComponent', () => {
  let component: Dtsu666CosphitodayComponent;
  let fixture: ComponentFixture<Dtsu666CosphitodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666CosphitodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666CosphitodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
