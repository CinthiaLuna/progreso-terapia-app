import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: () => import("~/app/login/login.module").then((m) => m.LoginModule) },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "reporte-diagnostico", loadChildren: () => import("~/app/reporte-diagnostico/reporte-diagnostico.module").then((m) => m.ReporteDiagnosticoModule) },
    { path: "reporte-citas", loadChildren: () => import("~/app/reporte-citas/reporte-citas.module").then((m) => m.ReporteCitasModule) },
    { path: "progreso-paciente", loadChildren: () => import("~/app/progreso-paciente/progreso-paciente.module").then((m) => m.ProgresoPacienteModule) },
    { path: "terapias", loadChildren: () => import("~/app/terapias/terapias.module").then((m) => m.TerapiasModule) },
    { path: "notificaciones", loadChildren: () => import("~/app/notificaciones/notificaciones.module").then((m) => m.NotificacionesModule) },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
