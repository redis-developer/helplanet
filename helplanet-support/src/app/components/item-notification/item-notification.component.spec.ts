import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNotificationComponent } from './item-notification.component';

describe('ItemNotificationComponent', () => {
  let component: ItemNotificationComponent;
  let fixture: ComponentFixture<ItemNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
