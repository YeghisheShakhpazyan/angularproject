import {Component} from '@angular/core';
import {FilterProject} from "./model/filterProject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filterData!: FilterProject;

  onSearch(data: FilterProject) {
    this.filterData = data
  }
}
