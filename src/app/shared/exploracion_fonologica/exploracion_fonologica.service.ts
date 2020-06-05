import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ExploracionFonologica } from "./exploracion_fonologica";
import { AuthService } from "../usuarioAppMovil/auth.service";
import { RouterExtensions } from "nativescript-angular/router";


@Injectable()
export class ExploracionFonologicaService {
    private urlEndPoint: string = 'http://192.168.100.72:8080/api/oauth2/exploracion_fonologica/';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient, private authService: AuthService, private routerExtensions: RouterExtensions) { }


    private agregarAuthorizationHeaders() {
        let token = this.authService.token;
        if (token != null) {
            return this.httpHeaders.append('Authorization', 'Bearer ' + token);

        } return this.httpHeaders;

    }

    obtenerExploracionFonologicaDesc(): Observable<ExploracionFonologica[]> {
        return this.http.get(`${this.urlEndPoint}pacienteDesc`, { headers: this.agregarAuthorizationHeaders() }).pipe(
            map(response => response as ExploracionFonologica[]),
            catchError(error => {
                this.isNoAuthorizado(error);
                return throwError(error);
            })
        );
    }
    
    obtenerExploracionFonologicaAsc(): Observable<ExploracionFonologica[]> {
        return this.http.get(`${this.urlEndPoint}pacienteAsc`, { headers: this.agregarAuthorizationHeaders() }).pipe(
            map(response => response as ExploracionFonologica[]),
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
