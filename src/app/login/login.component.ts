import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioAppMovil } from "../shared/usuarioAppMovil/usuarioAppMovil";
import { alert } from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";
import { AuthService } from "../shared/usuarioAppMovil/auth.service";


@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

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
        if (this.usuarioAppMovil.username == null || this.usuarioAppMovil.password == null) {
            this.alert("Ingresa usuario y contraseña");
            return;
        }
        this.authService.login(this.usuarioAppMovil).subscribe(response => {
            console.log(response)
            this.routerExtensions.navigate(['/home']);

        })

    }
    alert(message: string) {
        return alert({
            title: "¡Ops!",
            okButtonText: "Regresar",
            message: message
        });
    }
}
