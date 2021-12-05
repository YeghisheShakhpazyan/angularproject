import {Component, DoCheck, OnInit} from '@angular/core';
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/Status";
import {ProjectService} from "../../service/project.service";
import {Project} from "../../model/Project";
import {CountryService} from "../../service/country-service.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  selectedValue: string = "0";

  constructor(private statusService : StatusService,
              private projectService : ProjectService,
              public countryService : CountryService) {

  }

  ngOnInit(): void {
  }

  getAllStatuses() : Array<Status>{
    return this.statusService.getStatusesData();
  }

  getAllProjects() : Array<Project>{
    return this.projectService.getProjectsData(Number(this.selectedValue));
  }


  selectStatus() {
    this.getAllProjects();
    console.log(this.selectedValue);
  }
}
