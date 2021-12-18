import {Pipe, PipeTransform} from '@angular/core';
import {CountryService} from "../service/country-service.service";

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  constructor(private countryService: CountryService) {
  }

  transform(value: number, ...args: unknown[]): unknown {
    return this.countryService.getCountryByID(value)?.name["3"];
  }

}
