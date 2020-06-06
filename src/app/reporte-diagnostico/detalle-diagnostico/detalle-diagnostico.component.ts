import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as utf8 from 'utf8';
import * as base64 from 'base-64';
import { RouterExtensions } from "nativescript-angular/router";
import { ExploracionFonologicaService } from "~/app/shared/exploracion_fonologica/exploracion_fonologica.service";
import { PacienteService } from "~/app/shared/paciente/paciente.service";
import { ActivatedRoute } from "@angular/router";
import { PlanTrabajoService } from "~/app/shared/plan_trabajo/plan_trabajo.service";
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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

const jsPDF = require('../../jspdf');
const clipboard = require("../../nativescript-clipboard");
const dialogs = require("ui/dialogs");

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
    public exploracionFonologica: any;
    nombrePaciente: string;
    edadPaciente: string;
    planTrabajoIndicaciones: string;
    planTrabajonumeroSesiones: number;
    planTrabajonumeroBloque: number;
    planTrabajotemporalidad: string;


    constructor(
        private pacienteService: PacienteService,
        private planTrabajoService: PlanTrabajoService,
        private exploracionFonologicaService: ExploracionFonologicaService,
        private routerExtensions: RouterExtensions,
        private activedRoute: ActivatedRoute
    ) {
        this.exploracionFonologica = JSON.parse(this.activedRoute.snapshot.queryParams["exploracionFonologica"]);
        this.nombrePaciente = this.exploracionFonologica.paciente.nombrePaciente + " " + this.exploracionFonologica.paciente.apellidoPaciente;
        this.edadPaciente = this.exploracionFonologica.paciente.edadPaciente + " años";
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
    public showCollapseBox2 = true;
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
        var docDefinition = {

            content: [

                { text: 'REPORTE DE DIAGNÓSTICO', fontSize: '40', alignment: 'center' },
                { text: '\nDatos generales: ', fontSize: '20', alignment: 'justify' },
                { text: '\nFecha de reporte: ' + this.exploracionFonologica.fechaExploracionFonlogica, fontSize: '12', alignment: 'justify' },
                { text: '\nNombre de paciente: ' + this.nombrePaciente, fontSize: '12', alignment: 'justify' },
                { text: '\nNúmero de expediente: ' + this.exploracionFonologica.paciente.numero_expediente, fontSize: '12', alignment: 'justify' },                
                { text: '\nEdad de paciente: ' + this.edadPaciente, fontSize: '12', alignment: 'justify' },
                
            ],
        }
        pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
            dialogs.alert({
                title: "PDFMake - Base64",
                message: dataUrl,
                okButtonText: "Copy to Clipboard"
            }).then(() => {
                clipboard.setText(dataUrl);
            });
        });
    }
}
