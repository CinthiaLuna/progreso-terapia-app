import { Component, Directive, OnInit, AfterContentInit, DoCheck, AfterViewInit, AfterContentChecked } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as calendarModule from "nativescript-ui-calendar";
import { Color } from "tns-core-modules/color";
import { CitaService } from "../shared/cita/cita.service";
import { RouterExtensions } from "nativescript-angular/router";
import { Cita } from "../shared/cita/cita";
import { ProgresoCita } from "../shared/cita/progreso_cita";

@Component({
    selector: "ns-reporte-citas",
    templateUrl: "./reporte-citas.component.html",
    styleUrls: ["./reporte-citas.component.css"]
})
export class ReporteCitasComponent implements OnInit {
    citasPorBloque = [];
    fechaCitas = [];
    progresoCitas: ProgresoCita;
    asistencias: number;
    faltas: number;
    restantes: number;
    sesionEvaluada: number;
    bloqueMayor: number;
    calendarEvents = [];

    constructor(private routerExtensions: RouterExtensions, private citaService: CitaService) {
        this.citaService.obtenerCitasPorBloque().subscribe(
            result => {
                this.citasPorBloque = result;
                for (let i = 0; i < result.length; i++) {
                    this.fechaCitas[i] = result[i].fechaCita;
                }

            }
        );
        this.citaService.obtenerProgresoCitas().subscribe(
            result => {
                this.asistencias = result.asistencias;
                this.faltas = result.faltas;
                this.restantes = result.restantes;
                this.sesionEvaluada = result.sesionEvaluada;
                this.bloqueMayor = result.mayor;
            }
        );

    }
    ngOnInit() {

    }

    ngDoCheck() {
        let events = [];
        if(this.fechaCitas.length != 0){
            for (let i = 0; i < this.fechaCitas.length; i++) {
                var startDate = new Date(this.fechaCitas[i]);
                var endDate = new Date(this.fechaCitas[i]);
                var event = new calendarModule.CalendarEvent('TLF18 Terapia', startDate, endDate, true, new Color(200, 188, 26, 114));
                events.push(event);
            }
            this.calendarEvents = events;
        }
    }

    
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onDateSelected(args) {
        console.log("onDateSelected: " + args.date);
    }

    onDateDeselected(args) {
        console.log("onDateDeselected: " + args.date);
    }

    onNavigatedToDate(args) {
        console.log("onNavigatedToDate: " + args.date);
    }

    onNavigatingToDateStarted(args) {
        console.log("onNavigatingToDateStarted: " + args.date);
    }

    onViewModeChanged(args) {
        console.log("onViewModeChanged: " + args.newValue);
    }

    onSelected() {
        console.log("asd");
    }

}
