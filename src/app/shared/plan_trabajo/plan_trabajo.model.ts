export class PlanTrabajo {
    constructor(
        public idPlanTrabajo: number,
        public idPaciente: number,
        public fechaPlanTrabajo: string,
        public estadoPlanTrabajo: string,
        public indicacionesProcedimiento: string,
        public numeroSesiones: number,
        public numeroBloque: number,
        public temporalidad: string,

    ) { }
}
