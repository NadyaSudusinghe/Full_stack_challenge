import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BearListComponent } from './bear-list.component';
import { BearService } from '../../services/bear.service';
import { ColorService } from '../../services/color.service';
import { BearDto, ColorDto } from '../../services/bear.service';

describe('BearListComponent', () => {
  let component: BearListComponent;
  let fixture: ComponentFixture<BearListComponent>;
  let mockBearService: jasmine.SpyObj<BearService>;
  let mockColorService: jasmine.SpyObj<ColorService>;

  const mockBears: BearDto[] = [
    { id: 1, name: 'Grizzly', size: 300, colors: [] },
  ];
  const mockColors: ColorDto[] = [{ id: 1, name: 'Brown' }];

  beforeEach(async () => {
    mockBearService = jasmine.createSpyObj('BearService', [
      'getAll',
      'getByColor',
    ]);
    mockColorService = jasmine.createSpyObj('ColorService', ['getAll']);

    mockBearService.getAll.and.returnValue(of(mockBears));
    mockBearService.getByColor.and.returnValue(of(mockBears));
    mockColorService.getAll.and.returnValue(of(mockColors));

    await TestBed.configureTestingModule({
      imports: [BearListComponent],
      providers: [
        { provide: BearService, useValue: mockBearService },
        { provide: ColorService, useValue: mockColorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load bears on init', () => {
    expect(mockBearService.getAll).toHaveBeenCalled();
    expect(component.bears.length).toBe(1);
  });

  it('should filter bears by color', () => {
    component.filterColor = 'Brown';
    component.onFilterByColor();
    expect(mockBearService.getByColor).toHaveBeenCalledWith('Brown');
  });
});
