import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666DiennangtieuthutodayComponent } from './dtsu666-diennangtieuthutoday.component';

describe('Dtsu666DiennangtieuthutodayComponent', () => {
  let component: Dtsu666DiennangtieuthutodayComponent;
  let fixture: ComponentFixture<Dtsu666DiennangtieuthutodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666DiennangtieuthutodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666DiennangtieuthutodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
