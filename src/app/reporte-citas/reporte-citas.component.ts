import { Component } from "@angular/core";
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
export class ReporteCitasComponent {
    citasPorBloque : Cita[];
    progresoCitas: ProgresoCita;
    asistencias: number;
    faltas: number;
    sesionEvaluada: number;
    bloqueMayor: number;
    calendarEvents = [];
    constructor(private routerExtensions: RouterExtensions, private citaService: CitaService) {
          // Datos para el calendario
          let events = [];
          let now = new Date();
          let startDate;
          let endDate;
          let colors = [new Color(200, 188, 26, 214), new Color(220, 255, 109, 130), new Color(255, 55, 45, 255), new Color(199, 17, 227, 10), new Color(255, 255, 54, 3)];
          for (let i = 1; i < 10; i++) {
              startDate = new Date(now.getFullYear(), now.getMonth(), i * 2, 1);
              endDate = new Date(now.getFullYear(), now.getMonth(), (i * 2), 3);
              let event = new calendarModule.CalendarEvent("event " + i, startDate, endDate, false, colors[i * 10 % (colors.length - 1)]);
              events.push(event);
              if (i % 3 == 0) {
                  event = new calendarModule.CalendarEvent("second " + i, startDate, endDate, true, colors[i * 5 % (colors.length - 1)]);
                  events.push(event);
              }
          }

          this.calendarEvents = events;
     }

    ngOnInit() {
        this.citaService.obtenerCitasPorBloque().subscribe(
            result => {
                this.citasPorBloque = result;
            }
        );
        this.citaService.obtenerProgresoCitas().subscribe(
            result => {
                this.asistencias = result.asistencias;
                this.faltas = result.faltas + result.asistencias;
                this.sesionEvaluada = result.sesionEvaluada;
                this.bloqueMayor = result.mayor;

            }
        )
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
}
