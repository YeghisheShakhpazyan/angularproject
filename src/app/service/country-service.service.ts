import {Injectable} from '@angular/core';

import {Country} from "../model/Country";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  constructor(private http : HttpClient) {
  }




  getCountriesObservable() : Observable<Country[]>{
    return this.http.get<Country[]>("../../assets/country.json").pipe(map(countries => countries["data"]));
  }

  getCountryByID(id: number): Observable<Country> {
    return this.getCountriesObservable().pipe(map(countries => <Country>countries.find(country => country.CountryId == id)));
  }
}
