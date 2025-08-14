import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorListComponent } from './color-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorService } from '../../services/color.service';

describe('ColorListComponent', () => {
  let component: ColorListComponent;
  let fixture: ComponentFixture<ColorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ColorListComponent,           
        HttpClientTestingModule,   
        ReactiveFormsModule  
      ],
      providers: [ColorService]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
