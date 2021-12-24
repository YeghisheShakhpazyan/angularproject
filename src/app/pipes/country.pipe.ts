import {Pipe, PipeTransform} from '@angular/core';
import {CountryService} from "../service/country-service.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  constructor(private countryService: CountryService) {
  }

  transform(id: number, ...args: unknown[]): Observable<string> {
    return this.countryService.getCountryObservable(id).pipe(map(country => country.name["3"]));
  }

}
