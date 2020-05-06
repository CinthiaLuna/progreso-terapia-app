import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { ExploracionFonologica } from "./exploracion_fonologica";
import { AuthService } from "../usuarioAppMovil/auth.service";
import { RouterExtensions } from "nativescript-angular/router";


@Injectable()
export class ExploracionFonologicaService {
    private urlEndPoint: string = 'http://192.168.0.112:8080/api/oauth2/exploracion_fonologica/paciente';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient, private authService: AuthService, private routerExtensions: RouterExtensions) { }


    private agregarAuthorizationHeaders() {
        let token = this.authService.token;
        if (token != null) {
            return this.httpHeaders.append('Authorization', 'Bearer ' + token);

        } return this.httpHeaders;

    }

    obtenerExploracionFonologica(): Observable<ExploracionFonologica[]> {
        return this.http.get(this.urlEndPoint, { headers: this.agregarAuthorizationHeaders() }).pipe(
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
        if (error.estatus == 401 || error.estatus == 403) {
            this.routerExtensions.navigate(['/login'])
            return true;
        }
        return false;
    }

}
