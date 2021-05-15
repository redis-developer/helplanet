import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPlanetComponent } from './footer-planet.component';

describe('FooterPlanetComponent', () => {
  let component: FooterPlanetComponent;
  let fixture: ComponentFixture<FooterPlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterPlanetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
