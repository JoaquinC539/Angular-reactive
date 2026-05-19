import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExComponent } from './ex-component';

describe('ExComponent', () => {
  let component: ExComponent;
  let fixture: ComponentFixture<ExComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
