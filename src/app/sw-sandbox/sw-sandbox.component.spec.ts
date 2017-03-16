import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSandboxComponent } from './sw-sandbox.component';

describe('SwSandboxComponent', () => {
  let component: SwSandboxComponent;
  let fixture: ComponentFixture<SwSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwSandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
