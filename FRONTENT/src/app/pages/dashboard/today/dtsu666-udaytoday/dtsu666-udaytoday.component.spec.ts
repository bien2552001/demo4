import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666UdaytodayComponent } from './dtsu666-udaytoday.component';

describe('Dtsu666UdaytodayComponent', () => {
  let component: Dtsu666UdaytodayComponent;
  let fixture: ComponentFixture<Dtsu666UdaytodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666UdaytodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666UdaytodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
