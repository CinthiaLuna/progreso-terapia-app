import { Component, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { ExploracionFonologicaService } from "../shared/exploracion_fonologica/exploracion_fonologica.service";
import { PacienteService } from "../shared/paciente/paciente.service";
import { ExploracionFonologica } from "../shared/exploracion_fonologica/exploracion_fonologica";
import { Paciente } from "../shared/paciente/paciente";
import { Page, View } from "tns-core-modules/ui/page";
import { EventData } from "tns-core-modules/data/observable";
import { fromData, ImageSource } from "tns-core-modules/image-source";
import { Image, imageSourceProperty } from "tns-core-modules/ui/image";
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PanGestureEventData, GestureStateTypes } from 'tns-core-modules/ui/gestures';

const clipboard = require("../nativescript-clipboard")
const dialogs = require("ui/dialogs")

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

    constructor(private pacienteService: PacienteService,
        private exploracionFonologicaService: ExploracionFonologicaService,
        private routerExtensions: RouterExtensions) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }
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
    };

    onTap(args: EventData) {
        console.log("entro");
        const view = args.object as View;
        const targetView = view.page.getViewById('layout') as View;
        const img = view.page.getViewById('img') as Image;
        const screenShot = this.getImage(targetView);

        img.imageSource = screenShot;
        img.visibility = 'visible';
    }
    getImage(view: View) {
        view.android.setDrawingCacheEnabled(true);
        var bmp = android.graphics.Bitmap.createBitmap(view.android.getDrawingCache());
        view.android.setDrawingCacheEnabled(false);

        const source = new ImageSource(bmp);
        return source;
    }
    onPan(args: PanGestureEventData) {
        const view = args.object as View;
        if (args.state === GestureStateTypes.changed) {
            view.translateX = args.deltaX;
            view.translateY = args.deltaY;

        }
    }



}
