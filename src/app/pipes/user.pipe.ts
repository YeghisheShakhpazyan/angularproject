import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from "../service/user.service";

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  // TODO: change return types
  transform(value: number, ...args: unknown[]): unknown {
    return this.userService.getUserByID(value)?.name["3"];
  }

}
