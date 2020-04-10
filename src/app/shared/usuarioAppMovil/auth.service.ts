import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioAppMovil } from './usuarioAppMovil';
import * as  base64 from 'base-64';
import 'url-search-params-polyfill';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }
    login(usuarioAppMovil: UsuarioAppMovil): Observable<any> {
        const urlEndpoint = 'http://192.168.100.214:8080/oauth/token';
        const credenciales = base64.encode('androidApp' + ':' + '123');
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + credenciales
        });
        let params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('username', usuarioAppMovil.username);
        params.append('password', usuarioAppMovil.password);
        console.log(params.toString());
        return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });

    }
}
