import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventdialogComponent } from './event-dialog.component';

describe('EventdialogComponent', () => {
  let component: EventdialogComponent;
  let fixture: ComponentFixture<EventdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventdialogComponent],
    });
    fixture = TestBed.createComponent(EventdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
