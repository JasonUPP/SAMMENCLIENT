import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getHerramientasDto } from "src/app/Models/Dtos/Operativo/getHerramientasDto";
import { Herramienta } from "src/app/Models/Operativo/HerramientaModel";
import { MedidaHerramienta } from "src/app/Models/Operativo/medidaHerramientaModel";
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

    //Herramientas
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
        Descripcion: data.descripcion,
        NumeroSerie: data.numeroSerie,
        NumeroInforme: data.numeroInforme ? data.numeroInforme : '',
        FechaVencimiento: data.fechaVencimiento ? data.fechaVencimiento : new Date(),
        Dias: data.dias ? data.dias : 0,
        Estatus: data.estatus,
        FechaEntrega: data.fechaEntrega ? data.fechaEntrega : new Date(),
        DiasCampo: data.diasCampo ? data.diasCampo : 0,
        Acuse: data.acuse ? data.acuse : 0,
        Firma: data.firma ? data.firma : '',
        IdUbicacion: data.idUbicacion,
        UltimoMtto: data.ultimoMtto ? data.ultimoMtto : new Date(),
        DiasSinMtto: data.diasSinMtto ? data.diasSinMtto : 0,
        Observaciones: data.observaciones ? data.observaciones : '',
        Tipo: data.tipo,
      };      
      return this.http.post<response>(`${herramientaUrl}NewHerramienta`, herramienta);      
    }


    //MedidaHerramientas
    getMedidaHerramientas(){
      return this.http.get<MedidaHerramienta[]>(`${medidaHerramientaUrl}GetMedidasHerramientas`);
    }

    updateMedidaHerramienta({data}:any){
      const medidaH: MedidaHerramienta = data;
      return this.http.put<response>(`${medidaHerramientaUrl}UpdateMedidaHerramienta`, medidaH);
    }

    deleteMedidaHerramienta({key}:any){
      const id:number = key;
      return this.http.delete<response>(`${medidaHerramientaUrl}DeleteMedidaHerramienta/${id}`);
    }

    newMedidaHerramienta({data}:any){
      const medidaHerramienta: MedidaHerramienta = {
        Id: data.id ? data.id : 0,
        Numero: data.numero ? data.numero : 0,
        Descripcion : data.descripcion,
        RoscaCaja : data.roscaCaja ? data.roscaCaja : 0,
        RoscaPin : data.roscaPin ? data.roscaPin : 0,
        DiametroExterno : data.diametroExterno ? data.diametroExterno : 0,
        BalinPaso : data.balinPaso ? data.balinPaso : '',
        Longitud : data.longitud ? data.longitud : 0,
        NumeroSerie : data.numeroSerie,
        Estatus : data.estatus,
        TensionMaxima : data.tensionMaxima ? data.tensionMaxima : 0,
        PresionMaxima : data.presionMaxima ? data.presionMaxima : 0,
        BalinSub : data.balinSub ? data.balinSub : '',
        BalinDesconector : data.balinDesconector ? data.balinDesconector : '',
        Tipo : data.tipo,
      };

      return this.http.post<response>(`${medidaHerramientaUrl}NewMedidaHerramienta`, medidaHerramienta);
    }
}