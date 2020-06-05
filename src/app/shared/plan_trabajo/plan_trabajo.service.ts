import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { PlanTrabajo } from "./plan_trabajo";
import { AuthService } from "../usuarioAppMovil/auth.service";
import { RouterExtensions } from "nativescript-angular/router";


@Injectable()
export class PlanTrabajoService {
    private urlEndPont: string = 'http://192.168.100.72:8080/api/oauth2/plan_trabajo/'
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient, private authService: AuthService,  private routerExtensions: RouterExtensions) { }

    private agregarAuthorizationHeaders(){
        let token = this.authService.token;
        if (token != null) {
            return this.httpHeaders.append('Authorization', 'Bearer ' + token);

        }return this.httpHeaders;

    }

    obtenerPlanTrabajo(): Observable<PlanTrabajo[]> {
        return this.http.get(this.urlEndPont,{headers: this.agregarAuthorizationHeaders()}).pipe(
            map(response => response as PlanTrabajo[]),
            catchError(error => {
                this.isNoAuthorizado(error);
                return throwError(error);
            })
          );
    }

    obtenerPlanTrabajoPorExploracionFonologica(id): Observable<PlanTrabajo>{
        return this.http.get(`${this.urlEndPont}exploracion_fonologica/${id}`,{headers: this.agregarAuthorizationHeaders()}).pipe(
            map(response => response as PlanTrabajo),
            catchError(error => {
                this.isNoAuthorizado(error);
                return throwError(error);
            })
          );
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
    private isNoAuthorizado(error): boolean {
        if (error.estatus == 401 || error.estatus == 403){
            if (this.authService.isAuthenticated()) {
                this.authService.logout();
                
            }
            this.routerExtensions.navigate(['/login'])
            return true;
        }
        return false;
    }

}
