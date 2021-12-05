import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/Status";
import {ProjectService} from "../../service/project.service";
import {Project} from "../../model/Project";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private statusService : StatusService,private projectService : ProjectService) { }

  ngOnInit(): void {
  }

  getAllStatusesName() : Array<Status>{
    return this.statusService.getStatusesName();
  }

  getAllProjects() : Array<Project>{
    return this.projectService.getProjectsData();
  }
}
