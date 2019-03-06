import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: Country[];
  fetchUrl = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;callingCodes';

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this.countries ? of(this.countries)
      : this.http.get<any[]>(this.fetchUrl).pipe(
        map(res => res.map(
          c => ({
            name: c.name,
            code: c.alpha2Code,
            callingCode: c.callingCodes[0],
            flag: `flag flag-${c.alpha2Code.toLowerCase()}`
          }))
        )
      );
  }

}
