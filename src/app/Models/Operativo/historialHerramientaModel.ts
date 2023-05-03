export interface HistorialHerramienta {
    Id: number;
    Numero: number;
    Fecha: Date;
    Pozo: string;
    Estructura: string;
    TipoOperacion: number;
    Unidad: number;
    IdOperador: number;
    ProfundidadMax: number;
    OD: number;
    MaxWHP: number;
    TemperaturaMaxima: number;
    MaxCircPressure: number;
    Diesel: number;
    Solvente: number;        
    Acido: number;        
    Divergente: number;         
    Nitrogeno: number;        
    GelLineal: number;        
    Agua: number;        
    Inhibidor: number;
    HorasOperativas: number;
    HorasEfectivas: number;
    Notas: string;
    marca: string;
    modelo: string;
    numeroSerie: string;
}