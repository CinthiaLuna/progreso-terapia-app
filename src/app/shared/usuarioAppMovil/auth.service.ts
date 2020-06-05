import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioAppMovil } from './usuarioAppMovil';
import * as  base64 from 'base-64';
import 'url-search-params-polyfill';
import * as localStroage from 'nativescript-localstorage';
import { RouterExtensions } from 'nativescript-angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _usuarioAppMovil: UsuarioAppMovil;
    private _token: string;

    constructor(private http: HttpClient, private router: RouterExtensions) { }

    public get usuarioAppMovil(): UsuarioAppMovil {
        if (this._usuarioAppMovil != null) {
            return this._usuarioAppMovil;

        } else if (this._usuarioAppMovil == null && sessionStorage.getItem('usuarioAppMovil') != null) {
            this._usuarioAppMovil = JSON.parse(sessionStorage.getItem('usuarioAppMovil')) as UsuarioAppMovil;
            return this._usuarioAppMovil;
        }
        return new UsuarioAppMovil();

    }
    public get token(): string {
        if (this._token != null) {
            return this._token;

        } else if (this._token == null && sessionStorage.getItem('token') != null) {
            this._token = sessionStorage.getItem('token');
            return this._token;
        }
        return null;

    }

    login(usuarioAppMovil: UsuarioAppMovil): Observable<any> {
        const urlEndpoint = 'http://192.168.100.72:8080/oauth/token';
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

    guardarUsuario(accessToken: string): void {
        let payload = this.obtenerDatosToken(accessToken);
        this._usuarioAppMovil = new UsuarioAppMovil();
        this._usuarioAppMovil.username = payload.user_name;
        this._usuarioAppMovil.numeroExpediente = payload.numeroExpediente;
        localStroage.setItem('usuarioAppMovil', JSON.stringify(this._usuarioAppMovil));


    }
    guardarToken(accessToken: string): void {
        this._token = accessToken;
        localStroage.setItem('token', accessToken);
    }
    obtenerDatosToken(accessToken: string): any {
        if (accessToken != null) {
            return JSON.parse(base64.decode(accessToken.split(".")[1]));
        }
        return null;
    }

    isAuthenticated(): boolean{
        let payload = this.obtenerDatosToken(this.token);
        if (payload != null && payload.user_name && payload.user_name.length > 0) {
            return true;
        }
        return false;
    }

    logout(): void{
        this._token = null;
        this._usuarioAppMovil = null;
        sessionStorage.clear();
        this.router.navigate(['/'], { clearHistory: true })
    }
}
