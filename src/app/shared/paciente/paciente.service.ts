import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Paciente } from "./paciente";
import { throwError, Observable } from "rxjs";
import { idProperty } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { AuthService } from "../usuarioAppMovil/auth.service";

@Injectable()
export class PacienteService {
    private urlEndPoint: string = 'http://192.168.100.72:8080/api/oauth2/paciente';

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(private http: HttpClient, private routerExtensions: RouterExtensions, private authService: AuthService) { }

    private agregarAuthorizationHeaders(){
        let token = this.authService.token;
        if (token != null) {
            return this.httpHeaders.append('Authorization', 'Bearer ' + token);

        }return this.httpHeaders;

    }

    getPaciente(): Observable<Paciente> {
        return this.http.get<Paciente>(this.urlEndPoint, {headers: this.agregarAuthorizationHeaders()}).pipe(
            map(response => response as Paciente),
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
