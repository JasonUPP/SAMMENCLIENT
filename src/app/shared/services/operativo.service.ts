import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getHerramientasDto } from "src/app/Models/Dtos/Operativo/getHerramientasDto";
import { Herramienta } from "src/app/Models/Operativo/HerramientaModel";
import { response } from "src/app/Models/response";
import { environment } from "src/environments/environment";

const baseurl = environment.apiURL + 'api/';
const herramientaUrl = baseurl + 'Herramienta/';
const medidaHerramientaUrl = baseurl + 'MedidaHerramienta/';

@Injectable()
export class OperativoService {      

    constructor(private http: HttpClient){}

    getTest(){
        return this.http.get(`${baseurl}WeatherForecast`);
    }

    getHerramientas(){
      return this.http.get<getHerramientasDto>(`${herramientaUrl}GetHerramientas`);
    }

    updateHerramientas({data}:any){
      const herramienta: Herramienta = data;
      //Puede que aqui halla tema porque las porpiedades se mandan el minuscula      
      return this.http.put<response>(`${herramientaUrl}UpdateHerramienta`, herramienta);

    }

    deleteHerramienta(e:any){
      const id:number = e.key;      
      return this.http.delete<response>(`${herramientaUrl}DeleteHerramienta/${id}`);
    }

    newHerramienta({data}:any){
      const herramienta: Herramienta = {
        Id: data.id ? data.id : 0,
        Num:  data.num ? data.num : 0,
        Descripcion: data.descripcion,// ? data.descripcion : '',
        NumeroSerie: data.numeroSerie,// ? data.numeroSerie : '',
        NumeroInforme: data.numeroInforme ? data.numeroInforme : '',
        FechaVencimiento: data.fechaVencimiento ? data.fechaVencimiento : new Date(),
        Dias: data.dias ? data.dias : 0,
        Estatus: data.estatus,// ? data.estatus : 0,
        FechaEntrega: data.fechaEntrega ? data.fechaEntrega : new Date(),
        DiasCampo: data.diasCampo ? data.diasCampo : 0,
        Acuse: data.acuse ? data.acuse : 0,
        Firma: data.firma ? data.firma : '',
        IdUbicacion: data.idUbicacion,// ? data.idUbicacion : 0,
        UltimoMtto: data.ultimoMtto ? data.ultimoMtto : new Date(),
        DiasSinMtto: data.diasSinMtto ? data.diasSinMtto : 0,
        Observaciones: data.observaciones ? data.observaciones : '',
        Tipo: data.tipo //? data.tipo : 0,
      };      
      return this.http.post<response>(`${herramientaUrl}NewHerramienta`, herramienta);      
    }

    getMedidaHerramientas(){
      return this.http.get(`${medidaHerramientaUrl}GetMedidasHerramientas`);
    }

}