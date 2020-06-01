import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { Procedimiento } from "~/app/shared/procedimiento/procedimiento";
import { ProcedimientoService } from "~/app/shared/procedimiento/procedimiento.service";
import { TerapiaService } from "~/app/shared/terapia/terapia.service";

@Component({
    selector: "ns-lista-terapia",
    templateUrl: "./lista_terapia.component.html",
})
export class ListaTerapiaComponent implements OnInit {
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
        this.routerExtensions.navigate([""], {
            queryParams : {
                exploracionFonologica: JSON.stringify(item)
            }
        })
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
