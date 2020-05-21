import { Time } from "@angular/common";

export class Cita {
    idCita: number;
    bloque: number;
    numeroSesion: number;
    asistenciaCita:Boolean;
    tipoCita: String;
    fechaCita: Date;
    idSeguimiento: string;
    hora: Time;
}