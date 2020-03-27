import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ProgresoPacienteComponent } from "./progreso-paciente.component";

const routes: Routes = [
    { path: "", component: ProgresoPacienteComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ProgresoPacienteRoutingModule { }
