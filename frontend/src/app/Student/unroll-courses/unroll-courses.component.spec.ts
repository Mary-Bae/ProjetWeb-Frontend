import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnrollCoursesComponent } from './unroll-courses.component';

describe('UnrollCoursesComponent', () => {
  let component: UnrollCoursesComponent;
  let fixture: ComponentFixture<UnrollCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnrollCoursesComponent]
    });
    fixture = TestBed.createComponent(UnrollCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
