import {Injectable} from '@angular/core';
import * as statuses from "../../assets/status.json";
import {Status} from "../model/Status";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() {
  }

  private getStatuses() {
    return statuses;
  }

  getStatusesData() : Array<Status>{
    return <Array<Status>>this.getStatuses().data;
  }

  getStatusByID(id:number) : Status{
    return <Status>this.getStatusesData().find(value => value.WFSTATEID == id);
  }
}
