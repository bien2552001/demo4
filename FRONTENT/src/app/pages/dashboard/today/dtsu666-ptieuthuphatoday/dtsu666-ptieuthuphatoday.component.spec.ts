import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666PtieuthuphatodayComponent } from './dtsu666-ptieuthuphatoday.component';

describe('Dtsu666PtieuthuphatodayComponent', () => {
  let component: Dtsu666PtieuthuphatodayComponent;
  let fixture: ComponentFixture<Dtsu666PtieuthuphatodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666PtieuthuphatodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666PtieuthuphatodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
