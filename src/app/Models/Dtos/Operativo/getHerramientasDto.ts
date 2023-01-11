import { customJson } from "../../customJson";
import { Herramienta } from "../../Operativo/HerramientaModel";

export interface getHerramientasDto {
    herramientas: Herramienta[],
    ubicaciones: customJson[]
}