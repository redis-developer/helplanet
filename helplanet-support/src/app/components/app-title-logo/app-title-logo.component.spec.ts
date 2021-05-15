import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTitleLogoComponent } from './app-title-logo.component';

describe('AppTitleLogoComponent', () => {
  let component: AppTitleLogoComponent;
  let fixture: ComponentFixture<AppTitleLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTitleLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTitleLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
