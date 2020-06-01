import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { TerapiasComponent } from "./terapias.component";
import { DetalleTerapiaComponent } from "./detalle_terapia/detalle_terapia.component";
import { ListaTerapiaComponent } from "./lista_terapia/lista_terapia.component";

const routes: Routes = [
    { path: "", component: TerapiasComponent },
    { path: "detalle-terapia", component: DetalleTerapiaComponent },
    { path: "lista-terapia", component: ListaTerapiaComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TerapiasRoutingModule { }
