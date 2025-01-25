import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { StorageService } from "../auth/pages/login/services/storage.service"
import { AuthService } from "../auth/pages/login/services/auth.service"
import { EventBusService } from "../../shared/services/event-bus.service"
import { catchError, Observable, switchMap, throwError } from "rxjs"
import { EventData } from "../../shared/models/event.class"

@Injectable()
export class HttpProviderInterceptor implements HttpInterceptor {
    private isRefreshing = false

    private readonly storageService = inject(StorageService)
    private readonly authService = inject(AuthService)
    private readonly eventBusService = inject(EventBusService)

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
        request = request.clone({
            withCredentials: true,
        })

        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse &&
                !request.url.includes('auth/login') &&
                error.status === 401) {
                    return this.handle401Error(request, next)
                }

                return throwError(() => error)
            })
        );  
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
          this.isRefreshing = true
    
          if (this.storageService.isLoggedIn()) {
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                this.isRefreshing = false
    
                return next.handle(request)
              }),
              catchError((error) => {
                this.isRefreshing = false
    
                if (error.status == '403') {
                  this.eventBusService.emit(new EventData('logout', null))
                }
    
                return throwError(() => error)
              })
            );
          }
        }
    
        return next.handle(request)
    }
}