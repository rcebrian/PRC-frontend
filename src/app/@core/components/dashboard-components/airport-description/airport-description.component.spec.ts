import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportDescriptionComponent } from './airport-description.component';

describe('AirportDescriptionComponent', () => {
  let component: AirportDescriptionComponent;
  let fixture: ComponentFixture<AirportDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
