import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountryService} from "../service/country.service";
import {Country} from "../model/Country";
import {FormControl, FormGroup} from "@angular/forms";
import {FilterProject} from "../model/filterProject";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<FilterProject>();

  filterProject!: FilterProject
  filterForm!: FormGroup
  countries!: Array<Country>

  constructor(private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.createForm()
    this.getCountries();
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe(countries => this.countries = countries);
  }

  createForm(): void {
    this.filterForm = new FormGroup({
      countryId: new FormControl('0'),
      keyword: new FormControl(''),
      codeCheckbox: new FormControl(""),
      shortName: new FormControl(""),
      titleCheckbox: new FormControl(""),
      description: new FormControl(""),
      startDate: new FormControl(""),
      endDate: new FormControl("")
    });
  }

  onSearch() {
    this.createFilter();
    this.search.emit(this.filterProject);
  }

  createFilter(): void {
    this.filterProject = {
      countryId: +this.filterForm.controls["countryId"].value,
      keyword: this.filterForm.controls["keyword"].value,
      code: this.filterForm.controls["codeCheckbox"].value,
      shortName: this.filterForm.controls["shortName"].value,
      title: this.filterForm.controls["titleCheckbox"].value,
      description: this.filterForm.controls["description"].value,
      startDate: this.filterForm.controls["startDate"].value,
      endDate: this.filterForm.controls["endDate"].value,
    }
  }

  reset() {
    this.filterProject =
      {
        countryId: 0,
        keyword: "",
        code: false,
        shortName: false,
        title: false,
        description: false,
        startDate: 0,
        endDate: 0,
      }

    this.search.emit(this.filterProject);
  }
}
