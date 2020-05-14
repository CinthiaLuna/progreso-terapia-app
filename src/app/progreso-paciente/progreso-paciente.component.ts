import { Component } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { ExploracionFonologicaService } from "../shared/exploracion_fonologica/exploracion_fonologica.service";
import { PacienteService } from "../shared/paciente/paciente.service";
import { ExploracionFonologica } from "../shared/exploracion_fonologica/exploracion_fonologica";
import { Paciente } from "../shared/paciente/paciente";
import { getLocaleNumberFormat } from "@angular/common";
global['window'] = {
    'document': {
        'createElementNS': () => { return {} }
    }
};
global['document'] = {
    'createElement': (str) => { return {} }
};
global['navigator'] = {};
const base64 = require('../base-64');
const utf8 = require('../utf8');
const jsPDF = require('../jspdf')
const clipboard = require("../nativescript-clipboard")
const dialogs = require("ui/dialogs")

global['btoa'] = (str) => {
    var bytes = utf8.encode(str);
    return base64.encode(bytes);
};


@Component({
    selector: "ns-progreso-paciente",
    templateUrl: "./progreso-paciente.component.html",
    styleUrls: ["./progreso-paciente.component.css"]
})
export class ProgresoPacienteComponent {
    paciente: Paciente;
    exploracionesFonologicas: ExploracionFonologica[];
    nombrePaciente: string;
    numeroExpediente: string;
    edadPaciente: number;
    grao:string;


    constructor( private pacienteService: PacienteService, 
        private exploracionFonologicaService: ExploracionFonologicaService,
        private routerExtensions: RouterExtensions) {}
    ngOnInit(): void {
        this.pacienteService.getPaciente().subscribe(
            result => {
                this.paciente = result;
                this.nombrePaciente = this.paciente.nombrePaciente + ' ' + this.paciente.apellidoPaciente;
                this.numeroExpediente = this.paciente.numero_expediente;
                this.edadPaciente = this.paciente.edadPaciente;
                console.log(result);

            }
        );
        this.exploracionFonologicaService.obtenerExploracionFonologicaAsc().subscribe(
            result => {
                this.exploracionesFonologicas = result;
            }
        );
    } 
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    generatePDF() {

        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(26);
        doc.text(40, 40, "My first PDF with NativeScript!");

        var base64 = doc.output('datauristring')
        
        dialogs.alert({
            title: "Progreso paciente",
            message: "Click en copiar y pegalo en tu navegador",
            okButtonText: "Copiar ruta"
        }).then(() => {
            clipboard.setText(base64)
        });
    }
}
