import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioAppMovil } from "../shared/usuarioAppMovil/usuarioAppMovil";
import { alert } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { AuthService } from "../shared/usuarioAppMovil/auth.service";
import * as  base64 from 'base-64';


@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    @ViewChild('password', { static: false }) passwordField: ElementRef;
    usuarioAppMovil: UsuarioAppMovil;
    form: FormGroup;

    constructor(
        private authService: AuthService,
        private page: Page,
        private routerExtensions: RouterExtensions
    ) {
        this.usuarioAppMovil = new UsuarioAppMovil();
        this.page.actionBarHidden = true;
    }
    ngOnInit() {

    }
    login() {
        console.log(this.usuarioAppMovil);
        if (this.usuarioAppMovil.username == null || this.usuarioAppMovil.password == null ||
            this.usuarioAppMovil.username == "" || this.usuarioAppMovil.password == "") {
            this.alert("Ingresa usuario y contraseña");
            return;
        }
        this.authService.login(this.usuarioAppMovil).subscribe(response => {
            console.log(response);

            this.authService.guardarUsuario(response.access_token);
            this.authService.guardarToken(response.access_token);
            let usuarioAppMovil = this.authService.usuarioAppMovil;
            this.routerExtensions.navigate(['/home']);
            this.alert('bienvenido ' + '${usuarioAppMovil.username}');
        }, error => {
            if (error.status == 400) {
                this.alert("Usuario o clave incorrecta!");
            }
        });



    }

    alert(message: string) {
        return alert({
            title: "¡Ops!",
            okButtonText: "Regresar",
            message: message
        });
    }



}
