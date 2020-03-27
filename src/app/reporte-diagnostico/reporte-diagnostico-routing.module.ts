import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { ReporteDiagnosticoComponent } from "./reporte-diagnostico.component";

const routes: Routes = [
    { path: "", component: ReporteDiagnosticoComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ReporteDiagnosticoRoutingModule { }
