import {Pipe, PipeTransform} from '@angular/core';
import {StatusService} from "../service/status.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";


@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  constructor(private statusService: StatusService) {
  }

  transform(id: number, ...args: unknown[]): Observable<string> {
    return this.statusService.getStatus(id).pipe(map(status => status.name["3"]))
  }

}
