import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-detalle-terapia",
    templateUrl: "./detalle_terapia.component.html"
})
export class DetalleTerapiaComponent implements OnInit {

    constructor(
        private routerExtensions: RouterExtensions,
        ){

    }
    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
