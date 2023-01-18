export interface Herramienta {
    Id: number;
    Num: number;
    Descripcion: string;
    NumeroSerie: string;
    NumeroInforme: string;
    FechaVencimiento: Date;
    Dias: number;
    Estatus: number;
    FechaEntrega: Date;
    DiasCampo: number;
    Acuse: number;
    Firma: string;
    IdUbicacion: number;
    UltimoMtto: Date;
    DiasSinMtto: number;
    Observaciones: string;
    Tipo: number;
};