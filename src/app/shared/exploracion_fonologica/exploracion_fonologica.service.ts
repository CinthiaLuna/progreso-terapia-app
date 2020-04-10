import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ExploracionFonologica } from "./exploracion_fonologica.model";

@Injectable()
export class ExploracionFonologicaService {

    constructor(private http: HttpClient) { }

    obtenerExploracionFonologica() {
        return this.http.get('http://192.168.100.214:8080/api/exploracion_fonologica/paciente/1')
            .pipe(
                map((data: []) => {
                    let listaExploracionFonologica = [];
                    data.forEach((exploracion_fonologica) => {
                        listaExploracionFonologica.push(new ExploracionFonologica(
                            (<any>exploracion_fonologica).idExploracionFonologica,
                            (<any>exploracion_fonologica).idPaciente,
                            (<any>exploracion_fonologica).fechaExploracionFonlogica,
                            (<any>exploracion_fonologica).estadoExploracionFonologica,
                            (<any>exploracion_fonologica).nivelLenguajeBalbuceo,
                            (<any>exploracion_fonologica).nivelLenguajeBisilabos,
                            (<any>exploracion_fonologica).nivelLenguajePalabrasSueltas,
                            (<any>exploracion_fonologica).nivelLenguajeYuxtapuestas,
                            (<any>exploracion_fonologica).nivelLenguajeFrases,
                            (<any>exploracion_fonologica).nivelLenguajeOraciones,
                            (<any>exploracion_fonologica).inteligibilidadSeEntinde,
                            (<any>exploracion_fonologica).inteligibilidadNoSiempreSeentindeExpontaneo,
                            (<any>exploracion_fonologica).inteligibilidadNoSiempreSeentindeRepetitivo,
                            (<any>exploracion_fonologica).inteligibilidadNoSiempreSeentindeDenominativo,
                            (<any>exploracion_fonologica).inteligibilidadNoSeentiende,
                            (<any>exploracion_fonologica).silabasCompletas,
                            (<any>exploracion_fonologica).gradoTrastorno,
                            (<any>exploracion_fonologica).observaciones,
                            (<any>exploracion_fonologica).silabaFinal,
                            (<any>exploracion_fonologica).silabaInicial,
                            (<any>exploracion_fonologica).silabaIntermedia
                        ));
                    });
                    return listaExploracionFonologica
                }),
                catchError(this.handleErrors)
            )
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }

}
