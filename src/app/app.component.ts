import { Component, OnInit, OnChanges, AfterContentInit, DoCheck } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { AuthService } from "./shared/usuarioAppMovil/auth.service";
import { Paciente } from "./shared/paciente/paciente";
import { PacienteService } from "./shared/paciente/paciente.service";
import * as firebase from 'nativescript-plugin-firebase';
import { UsuarioAppMovil } from "./shared/usuarioAppMovil/usuarioAppMovil";
import { Message } from "nativescript-plugin-firebase";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    paciente: Paciente;

    constructor(private router: Router,
        private routerExtensions: RouterExtensions,
        private authService: AuthService,
        private pacienteService: PacienteService
    ) {
        // Use the component constructor to inject services.
    }


    ngOnInit(): void {
        this._activatedUrl = "/home";
        this.pacienteService.getPaciente().subscribe(
            result => {
                this.paciente = result;
                console.log(result);
            }
        );
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);


        firebase.init({
            onMessageReceivedCallback: (message: Message) => {
                console.log(`Title: ${message.title}`);
                console.log(`Body: ${message.body}`);
            },
            onPushTokenReceivedCallback: function(token) {
                console.log("Firebase push token: " + token);
            }
        })


    }



    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    logout(): void {
        this.authService.logout();
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
