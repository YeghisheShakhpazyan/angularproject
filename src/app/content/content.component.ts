import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StatusService} from "../service/status.service";
import {Status} from "../model/Status";
import {SortModel} from "../model/SortModel";
import {ProjectService} from "../service/project.service";
import {Project} from "../model/Project";
import {FilterProject} from "../model/filterProject";
import {TableSortService} from "../service/table-sort.service";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnChanges {

  @Input() searchFilterData!: FilterProject;
  selectedStatus: string = "0";
  projectData!: Array<Project>;
  sortModel: SortModel = {isDesk: 1, sortBy: ""};
  statuses!: Array<Status>
  page: number = 1

  constructor(private statusService: StatusService,
              private projectService: ProjectService,
              private tableSortService: TableSortService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initProjects()
  }

  ngOnInit(): void {
    this.initProjects();
    this.initStatuses();
  }

  initStatuses(): void {
    this.statusService.getStatuses().subscribe(statuses => this.statuses = statuses);
  }

  initProjects(): void {
    this.projectService.getProjectsByFilter(this.searchFilterData, +this.selectedStatus).subscribe(projects => this.projectData = projects);
  }

  selectStatus() {
    this.projectService.getProjectsByFilter(this.searchFilterData, +this.selectedStatus).subscribe(projects => this.projectData = projects);
  }

  sortProjects(sortBy: string) {
    if (sortBy == this.sortModel.sortBy) {
      this.sortModel.isDesk *= -1;
    } else {
      this.sortModel.isDesk = 1;
      this.sortModel.sortBy = sortBy;
    }
    this.tableSortService.getSortTable(this.projectData, this.sortModel).subscribe();
  }
}
