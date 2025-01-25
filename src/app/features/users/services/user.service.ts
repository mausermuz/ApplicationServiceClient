import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { User } from '../models/user'

const AUTH_API = 'http://localhost:8080/api/user/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient)

  private testData: User[] = [
    {
      id: 1,
      username: 'User1',
      status: true
    }, {
      id: 2,
      username: 'User2',
      status: true
    }, {
      id: 3,
      username: 'User3',
      status: false
    }
  ]

  // public getUsers(): Observable<User[]> {
  //   return this.http.get<User>(AUTH_API + 'getUsers')
  // }

  public getUsers(): Observable<User[]> {
    return of(this.testData)
    //return this.http.get<User>(AUTH_API + 'getUsers')
  }
  
  public updateStatusUsers(users: User[]): Observable<any> {
    return this.http.post<any>(AUTH_API + 'getUsers', users, httpOptions)
  }
}
