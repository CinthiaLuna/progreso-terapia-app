import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ProcedimientoService } from "../shared/procedimiento/procedimiento.service";
import { TerapiaService } from "../shared/terapia/terapia.service";
import { Procedimiento } from "../shared/procedimiento/procedimiento";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-terapias",
    templateUrl: "./terapias.component.html",
    styleUrls: ["./terapias.component.css"]
})
export class TerapiasComponent implements OnInit {
    listaProcedimiento: Procedimiento[];
    constructor(
        private procedimientoService: ProcedimientoService, 
        private terapiaService: TerapiaService,
        private routerExtensions: RouterExtensions,
        ){

    }
    ngOnInit(): void {
        this.procedimientoService.obtenerProcedimientos().subscribe(
            result => {
                this.listaProcedimiento = result;

            }
        );

    }
    onNavigate(item){
        this.routerExtensions.navigate(["/terapias/lista-terapia"], {
            queryParams : {
                detalleProcedimiento: JSON.stringify(item)
            }
        })
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
