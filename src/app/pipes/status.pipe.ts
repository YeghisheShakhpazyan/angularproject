import {Pipe, PipeTransform} from '@angular/core';
import {StatusService} from "../service/status.service";

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  constructor(private statusService: StatusService) {
  }

  transform(value: number, ...args: unknown[]): unknown {
    return this.statusService.getStatusByID(value)?.name[3];
  }

}
