import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S005Component } from './s005.component';

describe('S005Component', () => {
  let component: S005Component;
  let fixture: ComponentFixture<S005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [S005Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(S005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
