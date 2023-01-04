import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../shared/services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tkn = this.authService.token;        
        if(tkn){
            req = req.clone({
                setHeaders: {
                   Authorization: `Bearer ${tkn}`
                }
            })
        }
        return next.handle(req);
    }
}