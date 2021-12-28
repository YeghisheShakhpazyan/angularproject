import {Injectable} from '@angular/core';

import {Project} from "../model/Project";
import {FilterProject} from "../model/filterProject";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects!: Array<Project>

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>("assets/response.json").pipe(map(projects => projects["data"]));
  }

  getProjectsByFilter(searchFilter: FilterProject, statusID: number): Observable<Project[]> {
    return this.getProjects()
      .pipe(
        map(projects => this.filter(projects, searchFilter, statusID))
      );
  }

  filter(projects: Array<Project>, searchFilter: FilterProject, statusID: number): Array<Project> {
    let p = projects;
    if (statusID) {
      p = this.getProjectsByStatus(p, statusID);
    }
    if (searchFilter) {
      p = this.filterByCountryId(p, searchFilter.countryId);

      if (searchFilter?.keyword) {
        p = this.filterByKeyword(p, searchFilter);
      }
      if (searchFilter?.startDate || searchFilter?.endDate) {
        p = this.filterByDate(p, searchFilter);
      }
    }

    return p;
  }

  private getProjectsByStatus(projects: Array<Project>, statusID?: number): Array<Project> {
    if (statusID) {
      return projects.filter((value => value.workflowStateId == statusID))
    }

    return projects;
  }

  private filterByCountryId(projects: Array<Project>, countryId: number): Array<Project> {
    if (!countryId) {
      return projects;
    }
    return projects.filter(project => project.InterventionCountryID == countryId);
  }

  private filterByKeyword(projects: Array<Project>, searchFilter: FilterProject): Array<Project> {
    return projects.filter(project => this.keywordFilter(project, searchFilter));
  }

  private keywordFilter(project: Project, searchFilter: FilterProject): boolean {
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

  private filterByDate(projects: Array<Project>, searchFilter: FilterProject): Array<Project> {
    return projects.filter(project => this.dateFilter(project, searchFilter));
  }

  private dateFilter(project: Project, searchFilter: FilterProject): boolean {
    const searchStartDate = searchFilter.startDate ? new Date(searchFilter.startDate).getTime() : 0;
    const searchEndDate = searchFilter.endDate ? new Date(searchFilter.endDate).getTime() : Infinity;
    const actualDate = new Date(project.ActualStartDate).getTime();
    return searchStartDate <= actualDate && actualDate <= searchEndDate;
  }

  getProject(interventionID: number): Observable<Project> {
    return this.getProjects().pipe(map(projects => <Project>projects.find(project => project.InterventionID == interventionID)))
  }
}
