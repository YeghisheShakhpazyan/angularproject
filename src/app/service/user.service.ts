import {Injectable} from '@angular/core';
import {User} from "../model/User";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users!: Array<User>

  constructor(private http : HttpClient) {

  }




  getUsersObservable() : Observable<User[]>{
    if(this.users){
      return of(this.users);
    }else {
      return this.http.get<User[]>("../../assets/users.json").pipe(map(users => {
        this.users = users["data"];
        return this.users
      }));
    }
   }

  getUserObservable(id : number) : Observable<User>{
    return this.getUsersObservable().pipe(map(users => <User>users.find(user => user.UserID == id)));
  }
}
