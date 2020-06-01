import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TerapiasComponent } from "./terapias.component";
import { TerapiasRoutingModule } from "./terapias-routing.module";
import { ProcedimientoService } from "../shared/procedimiento/procedimiento.service";
import { TerapiaService } from "../shared/terapia/terapia.service";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular/listview-directives";
import { ListaTerapiaComponent } from "./lista_terapia/lista_terapia.component";
import { DetalleTerapiaComponent } from "./detalle_terapia/detalle_terapia.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    imports: [TerapiasRoutingModule, NativeScriptCommonModule,NativeScriptUIListViewModule],
    declarations: [TerapiasComponent, ListaTerapiaComponent, DetalleTerapiaComponent],
    providers: [ProcedimientoService, TerapiaService],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class TerapiasModule { }
