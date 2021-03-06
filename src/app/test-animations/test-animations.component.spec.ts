import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnimationsComponent } from './test-animations.component';

describe('TestAnimationsComponent', () => {
  let component: TestAnimationsComponent;
  let fixture: ComponentFixture<TestAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAnimationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
