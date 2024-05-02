import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthentificationService } from "./authentification.service";
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
 
    /**
     *
     */
    constructor(private AuthentificationService:AuthentificationService) {
       
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const isAuthenticated= this.AuthentificationService.isAuthenticated();
        if(isAuthenticated){
            const token= sessionStorage.getItem("jwt");
            req =req.clone({
                setHeaders:{Authorization:'Bearer '+token}
            })
 
            return next.handle(req).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && !req.url.includes('login') && error.status === 401) {
                    return this.handleRefreshToken(req, next);
                }
                 return throwError(error);
               
              }));
           
        }
        return next.handle(req);
    }
    handleRefreshToken(req: any, next: HttpHandler): any {
        return this.AuthentificationService.refreshToken().pipe(
            switchMap((response: any) => {
                console.log("response", response)
              // Update the new token in localStorage
              sessionStorage.setItem("jwt", response.token);
 
              // Retry the original request with the new token
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`,
                },
              });
 
              return next.handle(clonedRequest);
            }),
            catchError((refreshError) => {
              return throwError(refreshError);
            })
          );
        }
    }
