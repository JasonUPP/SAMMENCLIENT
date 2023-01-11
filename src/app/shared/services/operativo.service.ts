import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getHerramientasDto } from "src/app/Models/Dtos/Operativo/getHerramientasDto";
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

    getMedidaHerramientas(){
      return this.http.get(`${medidaHerramientaUrl}GetMedidasHerramientas`);
    }

}