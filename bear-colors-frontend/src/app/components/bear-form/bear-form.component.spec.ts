import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BearFormComponent } from './bear-form.component';

describe('BearFormComponent', () => {
  let component: BearFormComponent;
  let fixture: ComponentFixture<BearFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BearFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
