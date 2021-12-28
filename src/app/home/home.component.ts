import {Component} from '@angular/core';
import {FilterProject} from "../model/filterProject";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  filterData!: FilterProject;

  onSearch(data: FilterProject) {
    this.filterData = data
  }
}
