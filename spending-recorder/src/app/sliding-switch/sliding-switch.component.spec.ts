import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingSwitchComponent } from './sliding-switch.component';

describe('SlidingSwitchComponent', () => {
  let component: SlidingSwitchComponent;
  let fixture: ComponentFixture<SlidingSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidingSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidingSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
