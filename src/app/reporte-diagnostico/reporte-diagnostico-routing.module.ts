import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { ReporteDiagnosticoComponent } from "./reporte-diagnostico.component";
import { DetalleDiagnosticoComponent } from "./detalle-diagnostico/detalle-diagnostico.component";


const routes: Routes = [
    { path: "", component: ReporteDiagnosticoComponent },
    { path: "detalle-diagnostico", component: DetalleDiagnosticoComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ReporteDiagnosticoRoutingModule { }
