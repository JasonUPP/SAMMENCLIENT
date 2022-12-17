import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const httpOption = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

const baseurl = environment.apiURL;

@Injectable()
export class OperativoService {      

    constructor(private http: HttpClient){}

    getTest(){
        return this.http.get(`${baseurl}WeatherForecast`);
    }

}