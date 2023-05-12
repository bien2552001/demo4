import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pzem017DongdientodayComponent } from './pzem017-dongdientoday.component';

describe('Pzem017DongdientodayComponent', () => {
  let component: Pzem017DongdientodayComponent;
  let fixture: ComponentFixture<Pzem017DongdientodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pzem017DongdientodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pzem017DongdientodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
