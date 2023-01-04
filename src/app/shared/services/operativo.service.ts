import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const baseurl = environment.apiURL;
const herramientaUrl = baseurl + 'api/Herramienta/'

@Injectable()
export class OperativoService {      

    constructor(private http: HttpClient){}

    getTest(){
        return this.http.get(`${baseurl}WeatherForecast`);
    }

    getHerramientas(){
      return this.http.get(`${herramientaUrl}GetHerramientas`);
    }

}