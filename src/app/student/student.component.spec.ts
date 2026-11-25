import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentComponent } from './student.component';

declare function describe(description: string, specDefinitions: () => void): void;
declare function beforeEach(action: () => void): void;
declare function it(description: string, testFunction: () => void): void;
declare function expect<T>(actual: T): { toBeTruthy(): void };

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentComponent]
    });
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

