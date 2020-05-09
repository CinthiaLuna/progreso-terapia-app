import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { PacienteService } from "../shared/paciente/paciente.service";
import { Paciente } from "../shared/paciente/paciente";
import { ExploracionFonologicaService } from "../shared/exploracion_fonologica/exploracion_fonologica.service";
import { ExploracionFonologica } from "../shared/exploracion_fonologica/exploracion_fonologica";
import { RouterExtensions } from "nativescript-angular/router";



@Component({
    selector: "ns-reporte-diagnostico",
    templateUrl: "./reporte-diagnostico.component.html",
    styleUrls: ["./reporte-diagnostico.component.css"]
})
export class ReporteDiagnosticoComponent implements OnInit {
    paciente: Paciente;
    exploracionesFonologicas: ExploracionFonologica[];
    nombrePaciente: string;
    numeroExpediente: string;
    edadPaciente: number;

    constructor(
        private pacienteService: PacienteService, 
        private exploracionFonologicaService: ExploracionFonologicaService,
        private routerExtensions: RouterExtensions,
        ) { }

    ngOnInit() {
        this.pacienteService.getPaciente().subscribe(
            result => {
                this.paciente = result;
                this.nombrePaciente = this.paciente.nombrePaciente + ' ' + this.paciente.apellidoPaciente;
                this.numeroExpediente = this.paciente.numero_expediente;
                this.edadPaciente = this.paciente.edadPaciente;
                console.log(result);

            }
        );
        this.exploracionFonologicaService.obtenerExploracionFonologica().subscribe(
            result => {
                this.exploracionesFonologicas = result;
            }
        );


    }


    onNavigate(item){
        this.routerExtensions.navigate(["/reporte-diagnostico/detalle-diagnostico"], {
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
