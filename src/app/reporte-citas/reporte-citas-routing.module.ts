import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ReporteCitasComponent } from "./reporte-citas.component";


const routes: Routes = [
    { path: "", component: ReporteCitasComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ReporteCitasRoutingModule { }
