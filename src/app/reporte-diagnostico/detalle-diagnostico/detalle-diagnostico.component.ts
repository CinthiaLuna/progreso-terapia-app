import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { RouterExtensions } from "nativescript-angular/router";
import { ExploracionFonologicaService } from "~/app/shared/exploracion_fonologica/exploracion_fonologica.service";
import { PacienteService } from "~/app/shared/paciente/paciente.service";
import { ActivatedRoute } from "@angular/router";
import { PlanTrabajoService } from "~/app/shared/plan_trabajo/plan_trabajo.service";
import { PlanTrabajo } from "~/app/shared/plan_trabajo/plan_trabajo.";

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
    planTrabajoIndicaciones : string;
    planTrabajonumeroSesiones: number;
    planTrabajonumeroBloque: number;
    planTrabajotemporalidad: string;



    constructor(
        private pacienteService: PacienteService,
        private planTrabajoService: PlanTrabajoService,
        private exploracionFonologicaService: ExploracionFonologicaService,
        private routerExtensions: RouterExtensions,
        private activedRoute : ActivatedRoute
    ) {
        this.exploracionFonologica=JSON.parse(this.activedRoute.snapshot.queryParams["exploracionFonologica"]);
        this.nombrePaciente = this.exploracionFonologica.paciente.nombrePaciente + " " + this.exploracionFonologica.paciente.apellidoPaciente;
        this.edadPaciente = this.exploracionFonologica.paciente.edadPaciente + " años";
    }

    ngOnInit() {
        this.planTrabajoService.obtenerPlanTrabajoPorExploracionFonologica(this.exploracionFonologica.idExploracionFonologica).subscribe(
            result => {

                this.planTrabajoIndicaciones = result.indicacionesProcedimiento;
                this.planTrabajotemporalidad = result.temporalidad;
                this.planTrabajonumeroSesiones = result.numeroSesiones;
                this.planTrabajonumeroBloque = result.numeroBloque;
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

    public showCollapseBox = true;
    public showCollapseBox2 = true ;
    isCollapsed = true;
    isCollapsed2 = true;

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
}
