import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666UphatodayComponent } from './dtsu666-uphatoday.component';

describe('Dtsu666UphatodayComponent', () => {
  let component: Dtsu666UphatodayComponent;
  let fixture: ComponentFixture<Dtsu666UphatodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666UphatodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666UphatodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
