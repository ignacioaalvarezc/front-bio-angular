import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "../login.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private loginService:LoginService,
                private router:Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.loginService.getToken();
        if(token != null) {
            authReq = authReq.clone({
                setHeaders : {Authorization: `Bearer ${token}`}
            })
        }
        return next.handle(authReq).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {

                }
            },
            (error) => {
                if (error.status === 401) {
                    this.loginService.logout();
                    this.router.navigate(['/login'])
                }
            })
        );
    }
}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]