import {Injectable} from '@angular/core';
import {User} from "../model/User";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users$!: Observable<User[]>

  constructor(private http: HttpClient) {
    this.initUsers();
  }

  private initUsers(): void {
    this.users$ = this.http.get<User[]>("assets/users.json").pipe(
      map(users => {
        return users["data"];
      }),
      shareReplay({bufferSize: 1, refCount: true})
    )
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUser(id: number): Observable<User> {
    return this.users$.pipe(map(users => <User>users.find(user => user.UserID == id)));
  }
}
