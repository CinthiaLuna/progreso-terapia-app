import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioAppMovil } from "../shared/usuarioAppMovil/usuarioAppMovil";
import { alert } from "tns-core-modules/ui/dialogs";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { AuthService } from "../shared/usuarioAppMovil/auth.service";




@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    @ViewChild('password', { static: false }) passwordField: ElementRef;
    urlimagen = "res://baseline_visibility_off_black_18";
    usuarioAppMovil: UsuarioAppMovil;
    form: FormGroup
    procesando = false;

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
        this.procesando = true;
        if (this.usuarioAppMovil.username == null || this.usuarioAppMovil.password == null ||
            this.usuarioAppMovil.username == "" || this.usuarioAppMovil.password == "") {
            this.alert("Ingresa usuario y contraseña");
            this.usuarioAppMovil.username == "";
            this.usuarioAppMovil.password == "";
            this.procesando = false;
            return;
        }
        this.authService.login(this.usuarioAppMovil).subscribe(response => {
            console.log(response);
            this.authService.guardarUsuario(response.access_token);
            this.authService.guardarToken(response.access_token);
            let usuarioAppMovil = this.authService.usuarioAppMovil;
            this.routerExtensions.navigate(['/home']);
            this.procesando = true;
        }, error => {
            if (error.status == 400) {
                this.alert("Usuario o clave incorrecta!");
                this.procesando = true;
            }
        });



    }

    alert(message: string) {
        return alert({
            title: "¡Error!",
            okButtonText: "ok",
            message: message
        });
    }
    toggleShow() {
        console.log(this.passwordField.nativeElement.secure);
        if (this.passwordField.nativeElement.secure == true) {
            this.urlimagen ="res://baseline_visibility_black_18";
        }else{
            this.urlimagen ="res://baseline_visibility_off_black_18";
        }
        this.passwordField.nativeElement.secure = !this.passwordField.nativeElement.secure;
    }






}
