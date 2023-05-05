import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666IphatodayComponent } from './dtsu666-iphatoday.component';

describe('Dtsu666IphatodayComponent', () => {
  let component: Dtsu666IphatodayComponent;
  let fixture: ComponentFixture<Dtsu666IphatodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666IphatodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666IphatodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
