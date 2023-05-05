import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dtsu666TansotodayComponent } from './dtsu666-tansotoday.component';

describe('Dtsu666TansotodayComponent', () => {
  let component: Dtsu666TansotodayComponent;
  let fixture: ComponentFixture<Dtsu666TansotodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dtsu666TansotodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dtsu666TansotodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
