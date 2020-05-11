import { Component } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { ExploracionFonologicaService } from "../shared/exploracion_fonologica/exploracion_fonologica.service";
import { PacienteService } from "../shared/paciente/paciente.service";
import { ExploracionFonologica } from "../shared/exploracion_fonologica/exploracion_fonologica";
import { Paciente } from "../shared/paciente/paciente";
import { getLocaleNumberFormat } from "@angular/common";

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
    mostrarText(){
        this.grao="severo"
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
