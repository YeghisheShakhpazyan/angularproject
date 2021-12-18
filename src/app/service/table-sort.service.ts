import {Injectable} from '@angular/core';
import {Project} from "../model/Project";
import {SortModel} from "../model/SortModel";
import {CountryService} from "./country-service.service";
import {StatusService} from "./status.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TableSortService {

  constructor(private countryService: CountryService,
              private statusService: StatusService,
              private userService: UserService) {
  }

  sortTable(projects: Array<Project>, sortModel: SortModel): Array<Project> {
    switch (sortModel.sortBy) {
      case "InterventionCode":
        projects.sort(((a, b) => sortModel.isDesk * (a.InterventionCode.localeCompare(b.InterventionCode))));
        break;
      case "ShortName":
        projects.sort(((a, b) => sortModel.isDesk * (a.ShortName?.localeCompare(b.ShortName))));
        break;
      case "Title":
        projects.sort(((a, b) => sortModel.isDesk * (a.Title.localeCompare(b.Title))));
        break;
      case "InterventionCountryID":
        this.sortByCountry(projects, sortModel.isDesk);
        break;
      case "workflowStateId":
        this.sortByStatus(projects, sortModel.isDesk);
        break;
      case "UpdatedUserID":
        this.sortByUser(projects, sortModel.isDesk);
        break;
      case "DateUpdated":
        projects.sort(((a, b) => sortModel.isDesk * (a.DateUpdated - b.DateUpdated)));
        break;
    }
    return projects;
  }

  private sortByCountry(projects: Array<Project>, isDesk: number): void {
    projects.sort(((a, b) => isDesk * (this.countryService.getCountryByID(a.InterventionCountryID).name["3"]
      .localeCompare(this.countryService.getCountryByID(b.InterventionCountryID).name["3"]))));
  }

  private sortByStatus(projects: Array<Project>, isDesk: number): void {
    projects.sort(((a, b) => isDesk * (this.statusService.getStatusByID(a.workflowStateId)?.name["3"]
      .localeCompare(this.statusService.getStatusByID(b.workflowStateId)?.name["3"]))));
  }

  private sortByUser(projects: Array<Project>, isDesk: number): void {
    projects.sort(((a, b) => isDesk * (this.userService.getUserByID(a.UpdatedUserID)?.name["3"]
      .localeCompare(this.userService.getUserByID(b.UpdatedUserID)?.name["3"]))));
  }
}
