import {Component, OnInit} from '@angular/core';
import {Project} from "../model/Project";
import {ProjectService} from "../service/project.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  project!: Project

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.projectService.getProject(+params["id"]).subscribe(project => this.project = project);
    })
  }
}
