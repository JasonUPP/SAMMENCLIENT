import { customJson } from "../../customJson";
import { HistorialHerramienta } from "../../Operativo/historialHerramientaModel";

export interface getHistorialHerramientaDto {
    historialHerramientas: HistorialHerramienta[],
    operadores: customJson[]
}