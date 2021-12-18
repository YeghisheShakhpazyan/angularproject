import {Injectable} from '@angular/core';
import {User} from "../model/User";
import * as users from "../../assets/users.json";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  private getUsers() {
    return users;
  }

  getUsersData(): Array<User> {
    return <Array<User>>this.getUsers().data;
  }

  getUserByID(userId: number): User {
    return <User>this.getUsersData().find(value => value.UserID == userId)
  }
}
