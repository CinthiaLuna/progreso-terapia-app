import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { Procedimiento } from "~/app/shared/procedimiento/procedimiento";
import { ProcedimientoService } from "~/app/shared/procedimiento/procedimiento.service";
import { TerapiaService } from "~/app/shared/terapia/terapia.service";
import { ActivatedRoute } from "@angular/router";
import { Terapia } from "~/app/shared/terapia/terapia";

@Component({
    selector: "ns-lista-terapia",
    templateUrl: "./lista_terapia.component.html",
    styleUrls: ["./lista_terapia.component.css"]
})
export class ListaTerapiaComponent implements OnInit {
    public detalleProcedimiento : any;
    listaTerapia: Terapia[];

    


    constructor(
        private procedimientoService: ProcedimientoService, 
        private terapiaService: TerapiaService,
        private routerExtensions: RouterExtensions,
        private activedRoute : ActivatedRoute
        ){
            this.detalleProcedimiento=JSON.parse(this.activedRoute.snapshot.queryParams["exploracionFonologica"]);
            console.log(this.detalleProcedimiento);

    }
    ngOnInit(): void {
    
        this.terapiaService.obtenerTerapias(this.detalleProcedimiento.idProcedimiento).subscribe(
            result =>{
                this.listaTerapia = result;

            }

        )

    }

    onNavigate() {
        this.routerExtensions.back();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public showCollapseBox = false;
    isCollapsed = false;

    goCollapse(args) {
        if (this.showCollapseBox) {
            this.showCollapseBox = false;
            this.isCollapsed = !this.isCollapsed;
        }
        else {
            this.showCollapseBox = true;
            this.isCollapsed = !this.isCollapsed;
        }
    }
}
