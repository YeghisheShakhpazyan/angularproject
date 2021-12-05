import { Injectable } from '@angular/core';
import * as projects from "../assets/response.json";
import {Project} from "../model/Project";
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {}

  private getProjects() {
    return projects;
  }

  getProjectsData(statusID? : number) : Array<Project>  {

    if (statusID){
      return <Array<Project>>this.getProjectsData().filter((value => value.workflowStateId == statusID))
      console.log("filter");
    }
    return <Array<Project>>this.getProjects().data;
  }
}
