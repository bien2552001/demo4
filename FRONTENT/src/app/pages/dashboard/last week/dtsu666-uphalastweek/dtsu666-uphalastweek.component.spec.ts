import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666UphalastweekComponent } from './dtsu666-uphalastweek.component';

describe('Dtsu666UphalastweekComponent', () => {
  let component: Dtsu666UphalastweekComponent;
  let fixture: ComponentFixture<Dtsu666UphalastweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666UphalastweekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666UphalastweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
