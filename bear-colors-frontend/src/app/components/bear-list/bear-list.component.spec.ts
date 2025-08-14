import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BearListComponent } from './bear-list.component';

describe('BearListComponent', () => {
  let component: BearListComponent;
  let fixture: ComponentFixture<BearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BearListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
