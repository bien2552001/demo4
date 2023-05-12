import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pzem017DiennangtieuthutodayComponent } from './pzem017-diennangtieuthutoday.component';

describe('Pzem017DiennangtieuthutodayComponent', () => {
  let component: Pzem017DiennangtieuthutodayComponent;
  let fixture: ComponentFixture<Pzem017DiennangtieuthutodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pzem017DiennangtieuthutodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pzem017DiennangtieuthutodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
