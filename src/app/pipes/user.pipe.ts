import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from "../service/user.service";
import {Observable} from "rxjs/";
import {map} from "rxjs/operators";

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  // TODO: change return types
  transform(id: number, ...args: unknown[]): Observable<string> {
    return this.userService.getUserObservable(id).pipe(map(user => user?.name["3"]))
  }

}
