import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { PacienteService } from "../shared/paciente/paciente.service";
import { Paciente } from "../shared/paciente/paciente";

@Component({
    selector: "ns-reporte-diagnostico",
    templateUrl: "./reporte-diagnostico.component.html",
    styleUrls: ["./reporte-diagnostico.component.css"]
})
export class ReporteDiagnosticoComponent implements OnInit {

    public showCollapseBox = false;
    public showCollapseBox2 = false;
    public showCollapseBox3 = false;
    public showCollapseBox4 = false;
    isCollapsed = true;
    isCollapsed2 = true;
    isCollapsed3 = true;
    isCollapsed4 = true;
    paciente : Paciente;
    nombrePaciente: string;
    numeroExpediente: string;
    edadPaciente: number;


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
    constructor(private pacienteService: PacienteService) { }

    ngOnInit() {
        this.pacienteService.getPaciente().subscribe(
            result => {
                this.paciente = result;
                this.nombrePaciente = this.paciente.nombrePaciente + ' ' + this.paciente.apellidoPaciente;
                this.numeroExpediente = this.paciente.numero_expediente;
                this.edadPaciente = this.paciente.edadPaciente;
                console.log(result);

            }
        )

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
