import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ CountriesService ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CountriesService = TestBed.get(CountriesService);
    expect(service).toBeTruthy();
  });

  it('should fetch countries data', inject([HttpTestingController, CountriesService],
    (httpMock: HttpTestingController, service: CountriesService) => {
      service.getCountries().subscribe(data => {
        expect(data.length).toBe(2);
        expect(data[0].code).toEqual('US');
      });

      const req = httpMock.expectOne(service.fetchUrl);
      expect(req.request.method).toEqual('GET');
      req.flush([
        {'name': 'United States of America', 'alpha2Code': 'US', 'callingCodes': ['1']},
        {'name': 'Afghanistan', 'alpha2Code': 'AF', 'callingCodes': ['93']}
      ]);
    })
  );

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

});
