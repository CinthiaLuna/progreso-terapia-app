import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ReporteCitasRoutingModule } from "./reporte-citas-routing.module";
import { ReporteCitasComponent } from "./reporte-citas.component";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular"
import { CitaService } from "../shared/cita/cita.service";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular/calendar-directives";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    imports: [
        ReporteCitasRoutingModule, 
        NativeScriptCommonModule, 
        NativeScriptUIChartModule, 
        NativeScriptUIListViewModule,
        NativeScriptUICalendarModule
    ],
    declarations: [ReporteCitasComponent],
    providers: [CitaService],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class ReporteCitasModule { }
