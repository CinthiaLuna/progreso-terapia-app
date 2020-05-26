import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { RouterExtensions } from "nativescript-angular/router";
import { ExploracionFonologicaService } from "~/app/shared/exploracion_fonologica/exploracion_fonologica.service";
import { PacienteService } from "~/app/shared/paciente/paciente.service";
import { ActivatedRoute } from "@angular/router";
import { PlanTrabajoService } from "~/app/shared/plan_trabajo/plan_trabajo.service";
import { PlanTrabajo } from "~/app/shared/plan_trabajo/plan_trabajo";

global['window'] = {
    'document': {
        'createElementNS': () => { return {} }
    }
};
global['document'] = {
    'createElement': (str) => { return {} }
};
global['navigator'] = {};

const base64 = require('../../base-64');
const utf8 = require('../../utf8');
const jsPDF = require('../../jspdf')
const clipboard = require("../../nativescript-clipboard")
const dialogs = require("ui/dialogs")

global['btoa'] = (str) => {
    var bytes = utf8.encode(str);
    return base64.encode(bytes);
};

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

    generatePDF() {

        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(26);
        doc.text(40, 40, "Reporte de diagnóstico");
        doc.text(20,20,`{$this.nombrePaciente}`);

        var base64 = doc.output('datauristring')
        
        dialogs.alert({
            title: "Reporte de diagnóstico",
            message: "Click en copiar y pegalo en tu navegador",
            okButtonText: "Copiar ruta"
        }).then(() => {
            clipboard.setText(base64)
        });
    }
}
