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
  // TODO:rename
  selectedValue: string = "0";
  projectData: Array<Project>;
  sortModel: SortModel;

  constructor(private statusService: StatusService,
              private projectService: ProjectService,
              private tableSortService: TableSortService) {
    this.projectData = this.projectService.getProjectData(this.searchFilterData, +this.selectedValue);
    this.sortModel = {isDesk: 1, sortBy: ""};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchFilterData) {
      this.projectData = this.projectService.getProjectData(this.searchFilterData, +this.selectedValue);
    }
  }

  ngOnInit(): void {
  }

  getAllStatuses(): Array<Status> {
    return this.statusService.getStatusesData();
  }

  getAllProjects(): void {
    this.projectData = this.projectService.getProjectData(this.searchFilterData, Number(this.selectedValue));
  }

  selectStatus() {
    this.getAllProjects();
  }

  sortData($event: MouseEvent, sortBy: string) {
    if (sortBy == this.sortModel.sortBy) {
      this.sortModel.isDesk *= -1;
    } else {
      this.sortModel.isDesk = 1;
      this.sortModel.sortBy = sortBy;
    }
    this.tableSortService.sortTable(this.projectData, this.sortModel);
  }
}
