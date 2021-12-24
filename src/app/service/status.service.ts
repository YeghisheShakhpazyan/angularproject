import {Injectable} from '@angular/core';
import * as statuses from "../../assets/status.json";
import {Status} from "../model/Status";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statuses!: Status[]

  constructor(private http: HttpClient) {
  }

  private getStatuses() {
    return statuses;
  }

  getStatusesData(): Array<Status> {
    return <Array<Status>>this.getStatuses().data;
  }

  getStatusByID(id: number): Status {
    return <Status>this.getStatusesData().find(value => value.WFSTATEID == id);
  }

  getStatusesObservable(): Observable<Status[]> {
    if (this.statuses){
      return of(this.statuses);
    }
    return this.http.get<Status>("../../assets/status.json").pipe(map(statuses => {
      this.statuses=statuses["data"];
      return this.statuses;
    }
   ));
  }

  getStatusObservable(id: number): Observable<Status> {
    return this.getStatusesObservable().pipe(map(statuses => <Status>statuses.find(status => status.WFSTATEID == id)));
  }
}
