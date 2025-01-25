import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

const AUTH_API = 'http://localhost:8080/api/auth/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)

  public login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    )
  }

  public logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions)
  }

  public refreshToken(): Observable<any> {
    return this.http.post(AUTH_API + 'refresh', { }, httpOptions)
  }
}
