import {Injectable} from '@angular/core';
import * as projects from "../../assets/response.json";
import {Project} from "../model/Project";
import {FilterProject} from "../model/filterProject";

@Injectable(/*{
  providedIn: 'root'
}*/)
export class ProjectService {

  constructor() {
  }

  private getProjects() {
    return projects;
  }

  getProjectData(searchFilter: FilterProject, statusID: number) {
    let projects = <Array<Project>>this.getProjects().data;
    if (statusID) {
      projects = this.getProjectsByStatus(statusID);
    }
    if (searchFilter) {
      projects = this.filterByCountryId(projects, searchFilter.countryId);

      if (searchFilter?.keyword) {
        projects = this.keywordFilter(projects, searchFilter);
      }
      if (searchFilter?.startDate || searchFilter?.endDate) {
        projects = this.filterByDate(projects, searchFilter);
      }
    }
    return projects;
  }

  getProjectsByStatus(statusID?: number): Array<Project> {
    if (statusID) {
      return <Array<Project>>this.getProjects().data.filter((value => value.workflowStateId == statusID))
    }

    return <Array<Project>>this.getProjects().data;
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
}
