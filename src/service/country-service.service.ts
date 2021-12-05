import { Injectable } from '@angular/core';
import * as countries from "../assets/country.json";
import {Country} from "../model/Country";
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  private getCountries() {
    return countries;
  }

  getCountriesData() :Array<Country>{
    return <Array<Country>>this.getCountries().data;
  }

  getCountryByID(id : number) : Country{
    return <Country>this.getCountriesData().find(value => value.CountryId == id);
  }
}
