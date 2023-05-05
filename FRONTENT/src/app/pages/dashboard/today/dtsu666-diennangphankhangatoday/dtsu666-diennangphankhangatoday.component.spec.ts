import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666DiennangphankhangatodayComponent } from './dtsu666-diennangphankhangatoday.component';

describe('Dtsu666DiennangphankhangatodayComponent', () => {
  let component: Dtsu666DiennangphankhangatodayComponent;
  let fixture: ComponentFixture<Dtsu666DiennangphankhangatodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666DiennangphankhangatodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666DiennangphankhangatodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
