import {Injectable} from '@angular/core';
import {Project} from "../model/Project";
import {SortModel} from "../model/SortModel";
import {CountryService} from "./country.service";
import {StatusService} from "./status.service";
import {UserService} from "./user.service";
import {Observable, zip} from "rxjs";
import {Country} from "../model/Country";
import {Status} from "../model/Status";
import {User} from "../model/User";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TableSortService {

  constructor(private countryService: CountryService,
              private statusService: StatusService,
              private userService: UserService) {
  }

  getSortTable(projects: Array<Project>, sortModel: SortModel): Observable<Project[]> {
    let countries$ = this.countryService.getCountries();
    let statuses$ = this.statusService.getStatuses();
    let users$ = this.userService.getUsers();
    return zip(countries$, statuses$, users$).pipe(
      map(([countries, statuses, users]) => {
        this.sortTable(projects, sortModel, countries, statuses, users);
        return projects;
      }));
  }

  private sortTable(projects: Project[], sortModel: SortModel, countries: Country[], statuses: Status[], users: User[]): void {
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
        projects.sort((a, b) => sortModel.isDesk * (this.getCountryName(countries, a.InterventionCountryID)
          ?.localeCompare(this.getCountryName(countries, b.InterventionCountryID))));
        break;
      case "workflowStateId":
        projects.sort(((a, b) => sortModel.isDesk * (this.getStatusName(statuses, a.workflowStateId)
          ?.localeCompare(this.getStatusName(statuses, b.workflowStateId)))));
        break;
      case "UpdatedUserID":
        projects.sort(((a, b) => sortModel.isDesk * (this.getUserName(users, a.UpdatedUserID)
          ?.localeCompare(this.getUserName(users, b.UpdatedUserID)))));
        break;
      case "DateUpdated":
        projects.sort(((a, b) => sortModel.isDesk * (a.DateUpdated - b.DateUpdated)));
        break;
    }

  }

  private getCountryName(countries: Country[], InterventionCountryID: number): string {
    return <string>countries.find(country => country.CountryId == InterventionCountryID)?.name["3"];
  }

  private getStatusName(statuses: Status[], workflowStateId: number) {
    return <string>statuses.find(status => status.WFSTATEID == workflowStateId)?.name["3"];
  }

  private getUserName(users: User[], UpdatedUserID: number): string {
    return <string>users.find(user => user.UserID == UpdatedUserID)?.name["3"];
  }
}
