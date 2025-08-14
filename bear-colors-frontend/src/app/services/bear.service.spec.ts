import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BearService, BearDto } from './bear.service';

describe('BearService', () => {
  let service: BearService;
  let httpMock: HttpTestingController;
  const mockBears: BearDto[] = [{ id: 1, name: 'Grizzly', size: 300, colors: [] }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BearService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BearService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch all bears', () => {
    service.getAll().subscribe(bears => expect(bears).toEqual(mockBears));
    const req = httpMock.expectOne('/api/bear');
    expect(req.request.method).toBe('GET');
    req.flush(mockBears);
  });

  it('should fetch bears by color', () => {
    service.getByColor('brown').subscribe(bears => expect(bears).toEqual(mockBears));
    const req = httpMock.expectOne('/api/bear/colors/brown');
    expect(req.request.method).toBe('GET');
    req.flush(mockBears);
  });
});
