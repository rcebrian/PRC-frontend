import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportCommentsComponent } from './airport-comments.component';

describe('AirportCommentsComponent', () => {
  let component: AirportCommentsComponent;
  let fixture: ComponentFixture<AirportCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
