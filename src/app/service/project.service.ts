import {Injectable} from '@angular/core';

import {Project} from "../model/Project";
import {FilterProject} from "../model/filterProject";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable(/*{
  providedIn: 'root'
}*/)
export class ProjectService {

  projects! : Array<Project>

  constructor(private http : HttpClient) {
  }


  getProjectsObservable() : Observable<Project[]>{
    return this.http.get<Project[]>("assets/response.json").pipe(map(projects => projects["data"]));
  }

  getProjectData(searchFilter: FilterProject, statusID: number) : Observable<Project[]>{
    return this.getProjectsObservable().pipe(map(projects => {
      return this.filterData(projects,searchFilter,statusID);
    }));
  }

  filterData(projects : Array<Project>,searchFilter:FilterProject,statusID : number) : Array<Project>{
    let p = projects;
    if (statusID) {
      p = this.getProjectsByStatus(p,statusID);
    }
    if (searchFilter) {
      p = this.filterByCountryId(p, searchFilter.countryId);

      if (searchFilter?.keyword) {
        p = this.keywordFilter(p, searchFilter);
      }
      if (searchFilter?.startDate || searchFilter?.endDate) {
        p = this.filterByDate(p, searchFilter);
      }
    }
    return p;
  }

  getProjectsByStatus(projects : Array<Project>,statusID?: number): Array<Project> {
    if (statusID) {
      return <Array<Project>>projects.filter((value => value.workflowStateId == statusID))
    }

    return projects;
  }

  filterByCountryId(projects: Array<Project>, countryId: number): Array<Project> {
    if (!countryId) {
      return projects;
    }
    return projects.filter(project => project.InterventionCountryID == countryId);
  }

  filterByKeyword(project: Project, searchFilter: FilterProject): boolean {
    let flag = false;
    let isNotSelected = false;
    if (!(searchFilter.code || searchFilter.title || searchFilter.shortName)) {
      isNotSelected = true;
    }
    if (searchFilter.code || isNotSelected) {
      if (project.InterventionCode?.toLocaleLowerCase().includes(searchFilter?.keyword.toLocaleLowerCase())) {
        flag = true
      }
    }
    if (searchFilter.title || isNotSelected) {
      if (project.Title?.toLocaleLowerCase().includes(searchFilter?.keyword.toLocaleLowerCase())) {
        flag = true;
      }
    }
    if (searchFilter.shortName || isNotSelected) {
      if (project.ShortName?.toLocaleLowerCase().includes(searchFilter?.keyword.toLocaleLowerCase())) {
        flag = true;
      }
    }
    return flag;
  }

  // TODO: rename
  keywordFilter(projects: Array<Project>, searchFilter: FilterProject): Array<Project> {
    return projects.filter(project => this.filterByKeyword(project, searchFilter));
  }

  private dateFilter(project: Project, searchFilter: FilterProject): boolean {
// TODO: Use const
    let searchStartDate = searchFilter.startDate ? new Date(searchFilter.startDate).getTime() : 0;
    let searchEndDate = searchFilter.endDate ? new Date(searchFilter.endDate).getTime() : Infinity;
    let actualDate = new Date(project.ActualStartDate).getTime();

    return searchStartDate <= actualDate && actualDate <= searchEndDate;
  }

  filterByDate(projects: Array<Project>, searchFilter: FilterProject): Array<Project> {
    return projects.filter(project => this.dateFilter(project, searchFilter));
  }

  getProject(interventionID : number) : Observable<Project>{
    return this.getProjectsObservable().pipe(map(projects => <Project>projects.find(project => project.InterventionID==interventionID)))
  }
}
