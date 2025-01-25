import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient)
  private readonly router = inject(Router)

}
