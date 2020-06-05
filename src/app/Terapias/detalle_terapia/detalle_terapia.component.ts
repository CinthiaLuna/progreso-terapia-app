import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ns-detalle-terapia",
    templateUrl: "./detalle_terapia.component.html",
    styleUrls: ["./detalle_terapia.component.css"]
})
export class DetalleTerapiaComponent implements OnInit {
    public detalleTerapia: any;
    constructor(
        private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
    ) {
        this.detalleTerapia = JSON.parse(this.activatedRoute.snapshot.queryParams["detalleTerapia"]);
    }
    ngOnInit(): void {

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onNavigate() {
        this.routerExtensions.back();
    }

}
