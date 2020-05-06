import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReporteDiagnosticoComponent } from "./reporte-diagnostico.component";
import { ReporteDiagnosticoRoutingModule } from "./reporte-diagnostico-routing.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { PacienteService } from "../shared/paciente/paciente.service";
import { ExploracionFonologicaService } from "../shared/exploracion_fonologica/exploracion_fonologica.service";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { DetalleDiagnosticoComponent } from "./detalle-diagnostico/detalle-diagnostico.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    imports: [ReporteDiagnosticoRoutingModule, NativeScriptCommonModule, NativeScriptUIListViewModule],
    declarations: [ReporteDiagnosticoComponent, DetalleDiagnosticoComponent],
    providers: [PacienteService, ExploracionFonologicaService],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class ReporteDiagnosticoModule { }
