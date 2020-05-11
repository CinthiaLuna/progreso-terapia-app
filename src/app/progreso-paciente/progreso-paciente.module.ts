import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ProgresoPacienteRoutingModule } from "./progreso-paciente-routing.module";
import { ProgresoPacienteComponent } from "./progreso-paciente.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular/chart-directives";
import { PacienteService } from "../shared/paciente/paciente.service";
import { ExploracionFonologicaService } from "../shared/exploracion_fonologica/exploracion_fonologica.service";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    imports: [ProgresoPacienteRoutingModule, NativeScriptCommonModule,NativeScriptUIChartModule],
    declarations: [ProgresoPacienteComponent],
    providers: [PacienteService, ExploracionFonologicaService],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class ProgresoPacienteModule { }
