import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../models/user'
import { environment } from '../../../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient)

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'user/getusers')
  }

  public updateStatusUsers(users: User[]): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'getUsers', users, httpOptions)
  }
}
