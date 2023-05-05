import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666DienapphaTodayComponent } from './dtsu666-dienappha-today.component';

describe('Dtsu666DienapphaTodayComponent', () => {
  let component: Dtsu666DienapphaTodayComponent;
  let fixture: ComponentFixture<Dtsu666DienapphaTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666DienapphaTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666DienapphaTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
