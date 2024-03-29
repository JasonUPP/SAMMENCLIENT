import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { cursosDto } from "src/app/Models/Dtos/Operativo/cursosDto";
import { getHerramientasDto } from "src/app/Models/Dtos/Operativo/getHerramientasDto";
import { getHistorialHerramientaDto } from "src/app/Models/Dtos/Operativo/getHistorialHerramientaDto";
import { Herramienta } from "src/app/Models/Operativo/HerramientaModel";
import { HistorialHerramienta } from "src/app/Models/Operativo/historialHerramientaModel";
import { MedidaHerramienta } from "src/app/Models/Operativo/medidaHerramientaModel";
import { Operador } from "src/app/Models/Operativo/operadorModel";
import { Ubicacion } from "src/app/Models/Operativo/ubicacionModel";
import { response } from "src/app/Models/response";
import { environment } from "src/environments/environment";

const baseurl = environment.apiURL + 'api/';
const herramientaUrl = baseurl + 'Herramienta/';
const medidaHerramientaUrl = baseurl + 'MedidaHerramienta/';
const historialHerramientaUrl = baseurl + 'HistorialHerramienta/';
const operadorUrl = baseurl + 'Operador/';
const ubicacionUrl = baseurl + 'Ubicacion/';
const cursosUrl = baseurl + 'Cursos/';

@Injectable()
export class OperativoService {      

    constructor(private http: HttpClient){}
    
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
        Id: 0,
        Num:  data.num ? data.num : 0,
        Descripcion: data.descripcion,
        NumeroSerie: data.numeroSerie,
        NumeroInforme: data.numeroInforme ? data.numeroInforme : '',
        fechaVencimiento: data.fechaVencimiento ? data.fechaVencimiento : new Date(),
        dias: data.dias ? data.dias : 0,
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
        Id: 0,
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


    //HistorialHerramientas
    getHistorialHerramienta(){
      return this.http.get<getHistorialHerramientaDto>(`${historialHerramientaUrl}Get`);
    }

    updateHistorialHerramienta({data}:any){
      const hist: HistorialHerramienta = data
      return this.http.put<response>(`${historialHerramientaUrl}Update`, hist);
    }

    deleteHistorialHerramienta({key}:any){
      const id:number = key;
      return this.http.delete<response>(`${historialHerramientaUrl}Delete/${id}`);
    }

    addHistorialHerramienta({data}:any){
      const hist: HistorialHerramienta = {
        Id: 0,
        Numero: data.numero ? data.numero : 0,
        Fecha: data.fecha ? data.fecha : Date.now(),
        Pozo: data.pozo ? data.pozo : 0,
        Estructura: data.estructura ? data.estructura : '',
        TipoOperacion: data.tipoOperacion,
        Unidad: data.unidad,
        IdOperador: data.idOperador,
        ProfundidadMax: data.profundidadMax ? data.profundidadMax : 0,
        OD: data.oD ? data.oD : 0,
        MaxWHP: data.maxWHP ? data.maxWHP : 0,
        TemperaturaMaxima: data.temperaturaMaxima ? data.temperaturaMaxima : 0,
        MaxCircPressure: data.maxCircPressure ? data.maxCircPressure : 0,
        Diesel: data.diesel ? data.diesel : 0,
        Solvente: data.solvente ? data.solvente : 0,
        Acido: data.acido ? data.acido : 0,
        Divergente: data.divergente ? data.divergente : 0,
        Nitrogeno: data.nitrogeno ? data.nitrogeno : 0,
        GelLineal: data.gelLineal ? data.gelLineal : 0,
        Agua: data.agua ? data.agua : 0,
        Inhibidor: data.inhibidor ? data.inhibidor : 0,
        HorasOperativas: data.horasOperativas ? data.horasOperativas : 0,
        HorasEfectivas: data.horasEfectivas ? data.horasEfectivas : 0,
        Notas: data.notas ? data.notas : '',
        marca: data.marca ? data.marca : '',
        modelo: data.modelo ? data.modelo : '',
        numeroSerie: data.numeroSerie ? data.numeroSerie : '', 
      };
      return this.http.post<response>(`${historialHerramientaUrl}Add`, hist);
    }

    //Operador
    getOperadores(){
      return this.http.get<Operador[]>(`${operadorUrl}Get`);
    }

    updateOperador({data}:any){
      data.numeroCelular = data.numeroCelular ? data.numeroCelular.toString() : '';
      const opr: HistorialHerramienta = data;
      return this.http.put<response>(`${operadorUrl}Update`, opr);
    }

    deleteOperador({key}:any){
      const id:number = key;
      return this.http.delete<response>(`${operadorUrl}Delete/${id}`);
    }

    newOperador({data}:any){
      const opr: Operador = {
        id: 0,
        Nombre: data.nombre ? data.nombre : '',
        Apellido: data.apellido ? data.apellido :  '',
        Edad: data.edad ? data.edad: 0,
        Direccion: data.direccion ? data.direccion :  '',
        NumeroCelular: data.numeroCelular ? data.numeroCelular.toString() :  '',
        NSS: data.nss ? data.nss: 0,
        CursosSSPA: data.cursosSSPA ? data.cursosSSPA :  '',
        VigenciaCursosSSPA: new Date(),
        CursosTecnicos: data.cursosTecnicos ? data.cursosTecnicos :  '',
        VigenciaCursosTecnicos: new Date(),
        CVSAMMEN: data.cvsammen ? data.cvsammen :  '',
        ExamenesMedicos: data.examenesMedicos ? data.examenesMedicos :  '',
        CursosOExperiencia: data.cursosOExperiencia ? data.cursosOExperiencia :  '',
        estatus: data.estatus,
      };
      return this.http.post<response>(`${operadorUrl}New`, opr);
    }

    
    updateEstatusOperador(idOperador:number, estatus:number){
      const obj = {
        idOperador,
        estatus
      }
      return this.http.put<response>(`${operadorUrl}UpdateEstatus`, obj);
    }

    //Ubicacion
    getUbicaciones(){
      return this.http.get<Ubicacion[]>(`${ubicacionUrl}Get`)
    }

    updateUbicacion({data}:any){
      data.numeroCelular = data.numeroCelular ? data.numeroCelular.toString() : '';      
      data.caja = data.caja ? data.caja.toString() : '';
      const ubicacion: Ubicacion = data;
      return this.http.put<response>(`${ubicacionUrl}Update`, ubicacion);
    }

    deleteUbicacion({key}:any){
      const id:number = key;
      return this.http.delete<response>(`${ubicacionUrl}Delete/${id}`);
    }

    newUbicacion({data}:any){
      const ubi: Ubicacion = {
        Id : 0,
        Nombre : data.nombre,
        Abreviatura : data.abreviatura,
        Direccion : data.direccion ? data.direccion : '',
        NumeroCelular : data.numeroCelular ? data.numeroCelular.toString() : '',
        CantidadUTF : data.cantidadUTF ? data.cantidadUTF : 0,
        Caja : data.caja ? data.caja : '',
      }
      return this.http.post<response>(`${ubicacionUrl}New`, ubi);
    }

    getCursos(){
      return this.http.get(`${cursosUrl}Get`);
    }

    getRelacion(){
      return this.http.get(`${cursosUrl}GetRelacion`);
    }

    getCursosPorOperador(id:number){
      return this.http.get<cursosDto[]>(`${cursosUrl}GetCursosPorOperador/${id}`)
    }

    newCursosByOperador(idOperador:number, CursosDtos:cursosDto[]){
      const body = {
        idOperador,
        CursosDtos
      };
      return this.http.post<response>(`${cursosUrl}NewCursosPorOperador`, body);
    }

    updateCursosOperador(idOperador:number, CursosDtos:cursosDto[]){
      const body = {
        idOperador,
        CursosDtos
      };
      return this.http.put<response>(`${cursosUrl}UpdateCursosPorOperador`, body);
    }
}