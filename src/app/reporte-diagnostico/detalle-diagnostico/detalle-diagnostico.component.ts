import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { RouterExtensions } from "nativescript-angular/router";
import { ExploracionFonologicaService } from "~/app/shared/exploracion_fonologica/exploracion_fonologica.service";
import { PacienteService } from "~/app/shared/paciente/paciente.service";
import { ActivatedRoute } from "@angular/router";

declare var jsPDF: any;

@Component({
    selector: "ns-detalle-reporte",
    templateUrl: "./detalle-diagnostico.component.html",
    styleUrls: ["./detalle-diagnostico.component.css"]
})
export class DetalleDiagnosticoComponent implements OnInit {
    public exploracionFonologica : any;
    nombrePaciente : string;
    edadPaciente: string;
    fechaExploracionFonologica: string
    array = new Array();

    constructor(
        private pacienteService: PacienteService, 
        private exploracionFonologicaService: ExploracionFonologicaService,
        private routerExtensions: RouterExtensions,
        private activedRoute : ActivatedRoute
    ) { 
        this.exploracionFonologica=JSON.parse(this.activedRoute.snapshot.queryParams["exploracionFonologica"]);
        this.nombrePaciente = this.exploracionFonologica.paciente.nombrePaciente + " " + this.exploracionFonologica.paciente.apellidoPaciente;
        this.edadPaciente = this.exploracionFonologica.paciente.edadPaciente + " años";
        /* Formato de fecha */
        this.fechaExploracionFonologica = this.exploracionFonologica.fechaExploracionFonlogica;
        this.array = this.fechaExploracionFonologica.split("T");
        this.array = this.array[0].split("-");
        this.fechaExploracionFonologica = this.array[2] + "-" + this.array[1] + "-" + this.array[0];
        console.dir(this.array);
        console.log(this.fechaExploracionFonologica);
    }

    ngOnInit() {
        

    }

    onNavigate() {
        this.routerExtensions.back();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public showCollapseBox = false;
    public showCollapseBox2 = false;
    public showCollapseBox3 = false;
    public showCollapseBox4 = false;
    isCollapsed = true;
    isCollapsed2 = true;
    isCollapsed3 = true;
    isCollapsed4 = true;

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
    goCollapse2(args) {
        if (this.showCollapseBox2) {
            this.showCollapseBox2 = false;
            this.isCollapsed2 = !this.isCollapsed2;
        }
        else {
            this.showCollapseBox2 = true;
            this.isCollapsed2 = !this.isCollapsed2;
        }
    }
    goCollapse3(args) {
        if (this.showCollapseBox3) {
            this.showCollapseBox3 = false;
            this.isCollapsed3 = !this.isCollapsed3;
        }
        else {
            this.showCollapseBox3 = true;
            this.isCollapsed3 = !this.isCollapsed3;
        }
    }
    goCollapse4(args) {
        if (this.showCollapseBox4) {
            this.showCollapseBox4 = false;
            this.isCollapsed4 = !this.isCollapsed4;
        }
        else {
            this.showCollapseBox4 = true;
            this.isCollapsed4 = !this.isCollapsed4;
        }
    }
}
