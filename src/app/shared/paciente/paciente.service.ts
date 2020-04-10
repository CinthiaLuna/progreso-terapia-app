import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Paciente } from "./paciente.model";
import { throwError, Observable } from "rxjs";
import { idProperty } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

@Injectable()
export class PacienteService {
    private urlEndPoint: string = 'http://192.168.100.214:8080/api/oauth2/paciente/';
    constructor(private http: HttpClient, private routerExtensions: RouterExtensions) { }

    getPaciente(): Observable<Paciente[]> {
        return this.http.get<Paciente[]>(this.urlEndPoint).pipe(
            catchError(error => {
                this.isNoAuthorizado(error);
                return throwError(error);
            })
        )
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
