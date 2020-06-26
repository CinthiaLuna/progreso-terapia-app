import { Component, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { ExploracionFonologicaService } from "../shared/exploracion_fonologica/exploracion_fonologica.service";
import { PacienteService } from "../shared/paciente/paciente.service";
import { ExploracionFonologica } from "../shared/exploracion_fonologica/exploracion_fonologica";
import { Paciente } from "../shared/paciente/paciente";
import { fromData, ImageSource } from "tns-core-modules/image-source";
import { Cscreenshot } from 'nativescript-cscreenshot';
//import { ImageSource } from 'tns-core-modules/image-source';
import * as fs from "tns-core-modules/file-system";




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
    }

    @ViewChild("main", {static: true}) view: ElementRef;

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

    onTap() {
        let screen = new Cscreenshot();
            const permission = require("nativescript-permissions");
            permission.requestPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE,"");
            screen.take(this.view.nativeElement, (image: ImageSource)=>{

                //const folderDest = fs.path.join("/storage/emulated/0/Download");
                //const pathDest = fs.path.join(folderDest, "Wow-Auctnr_"+new Date().toUTCString()+".png");

                const folderDest = fs.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getAbsolutePath())
                const pathDest = fs.path.join(folderDest, "Progreso del paciente"+".png");

                if(!fs.File.exists(folderDest)){
                    fs.Folder.fromPath(folderDest);
                }
                console.log(pathDest);
                const saved: boolean = image.saveToFile(pathDest, "png");
                if (saved) {
                    dialogs.alert({
                        title: "Progreso del paciente",
                        message: "El progreso del paciente ha sido guardado en la carpeta de descargas",
                        okButtonText: "Ok"
                    })
                }
            });


    }




}
