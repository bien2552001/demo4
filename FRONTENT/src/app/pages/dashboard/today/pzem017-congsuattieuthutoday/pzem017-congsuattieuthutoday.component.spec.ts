import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pzem017CongsuattieuthutodayComponent } from './pzem017-congsuattieuthutoday.component';

describe('Pzem017CongsuattieuthutodayComponent', () => {
  let component: Pzem017CongsuattieuthutodayComponent;
  let fixture: ComponentFixture<Pzem017CongsuattieuthutodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pzem017CongsuattieuthutodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pzem017CongsuattieuthutodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
