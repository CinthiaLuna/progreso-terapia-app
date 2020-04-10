export class ExploracionFonologica {
    constructor(
        public idExploracionFonologica: number,
        public idPaciente: number,
        public fechaExploracionFonlogica: string,
        public estadoExploracionFonologica: string,
        public nivelLenguajeBalbuceo: boolean,
        public nivelLenguajeBisilabos: boolean,
        public nivelLenguajePalabrasSueltas: boolean,
        public nivelLenguajeYuxtapuestas: boolean,
        public nivelLenguajeFrases: boolean,
        public nivelLenguajeOraciones: boolean,
        public inteligibilidadSeEntiende: boolean,
        public inteligibilidadNoSiempreSeentiendeExpontaneo: boolean,
        public inteligibilidadNosiempreSeentiendeRepetitivo: boolean,
        public inteligibilidadNosiempreSeentiendeDenominativo: boolean,
        public inteligibilidadNoSeentiende: boolean,
        public silabasCompletas: boolean,
        public gradoTrastorno: string,
        public observaciones: string,
        public silabaFinal: boolean,
        public silabaInicial: boolean,
        public silabaIntermedia: boolean
    ) { }
}
