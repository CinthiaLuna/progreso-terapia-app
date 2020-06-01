import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { AuthService } from "../usuarioAppMovil/auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Cita } from "./cita";
import { ProgresoCita } from "./progreso_cita";


@Injectable()
export class CitaService {
    private urlEndPoint: string = 'http://192.168.100.24:8080/api/oauth2/cita';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient, private authService: AuthService, private routerExtensions: RouterExtensions) { }


    private agregarAuthorizationHeaders() {
        let token = this.authService.token;
        if (token != null) {
            return this.httpHeaders.append('Authorization', 'Bearer ' + token);

        } return this.httpHeaders;

    }

    obtenerCitasPorBloque(): Observable<Cita[]> {
        return this.http.get(this.urlEndPoint, {headers: this.agregarAuthorizationHeaders() }).pipe(
            map(response => response as Cita[]),
            catchError(error => {
                this.isNoAuthorizado(error);
                return throwError(error);
            })
        );
    }

    obtenerProgresoCitas(): Observable<ProgresoCita>{
        return this.http.get(`${this.urlEndPoint}/progreso_cita`, {headers: this.agregarAuthorizationHeaders() }).pipe(
            map(response => response as ProgresoCita),
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
