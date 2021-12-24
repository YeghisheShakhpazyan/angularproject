import {Injectable} from '@angular/core';
import * as countries from "../../assets/country.json";
import {Country} from "../model/Country";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries!: Country[];

  constructor(private http : HttpClient) {
  }

  private getCountries() {
    return countries;
  }

  getCountriesData(): Array<Country> {
    return <Array<Country>>this.getCountries().data;
  }

  getCountryByID(id: number): Country {
    return <Country>this.getCountriesData().find(value => value.CountryId == id);
  }

  getCountriesObservable() : Observable<Country[]>{
    if (this.countries){

      return of(this.countries);
    }
    return this.http.get<Country[]>("assets/country.json").pipe(map(countries =>{
      this.countries =  countries["data"]
      return this.countries;
    }));

  }

  getCountryObservable(id: number): Observable<Country> {
    return this.getCountriesObservable().pipe(map(countries => <Country>countries.find(country => country.CountryId == id)));
  }



}
