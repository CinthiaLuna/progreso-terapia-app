import { Component } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "ns-progreso-paciente",
    templateUrl: "./progreso-paciente.component.html",
    styleUrls: ["./progreso-paciente.component.css"]
})
export class ProgresoPacienteComponent {

    constructor() { }

    ngOnInit(): void {
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
