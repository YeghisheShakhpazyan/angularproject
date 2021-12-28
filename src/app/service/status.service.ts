import {Injectable} from '@angular/core';
import {Status} from "../model/Status";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statuses$!: Observable<Status[]>

  constructor(private http: HttpClient) {
    this.initStatuses();
  }

  private initStatuses(): void {
    this.statuses$ = this.http.get<Status>("../../assets/status.json").pipe(map(statuses => {
        return statuses["data"];
      }),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  getStatuses(): Observable<Status[]> {
    return this.statuses$;
  }

  getStatus(id: number): Observable<Status> {
    return this.getStatuses().pipe(map(statuses => <Status>statuses.find(status => status.WFSTATEID == id)));
  }
}
