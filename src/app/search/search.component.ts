import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../service/country-service.service";
import {Country} from "../../model/Country";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {



  constructor(private countryService : CountryService) { }

  ngOnInit(): void {
  }

  getAllCountryName() : Array<Country>{
    return this.countryService.getCountriesData();
  }

}
