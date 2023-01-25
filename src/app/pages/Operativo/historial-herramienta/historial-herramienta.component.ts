import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { customJson } from 'src/app/Models/customJson';
import { getHistorialHerramientaDto } from 'src/app/Models/Dtos/Operativo/getHistorialHerramientaDto';
import { HistorialHerramienta } from 'src/app/Models/Operativo/historialHerramientaModel';
import { response } from 'src/app/Models/response';
import { OperativoService } from 'src/app/shared/services/operativo.service';
import { EstatusList } from 'src/assets/EstatusList';
import { TipoOperacion } from 'src/assets/TipoOperacion';
import { Unidad } from 'src/assets/Unidad';

@Component({
  selector: 'app-historial-herramienta',
  templateUrl: './historial-herramienta.component.html',
  styleUrls: ['./historial-herramienta.component.scss']
})
export class HistorialHerramientaComponent implements OnInit {
  loading: boolean = true;
  dataSource: HistorialHerramienta[] = [];
  requiredMsj:string = 'Este campo es requerido';
  estatusList: customJson[];
  tipoOperacion: customJson[];
  unidad: customJson[];
  operadores: customJson[] = [];

  constructor(private operativoService: OperativoService){
    this.estatusList = EstatusList; 
    this.tipoOperacion = TipoOperacion;
    this.unidad = Unidad;
  }

  ngOnInit(): void {
    this.getHistorialHerramienta();
  }

  getHistorialHerramienta(){
    this.operativoService.getHistorialHerramienta()
    .subscribe({
      next: (data:getHistorialHerramientaDto) => {
        this.dataSource = data.historialHerramientas;
        this.operadores = data.operadores;
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  deleteHistorialHerramienta(e:any){
    this.operativoService.deleteHistorialHerramienta(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  updateHistorialHerramienta(e:any){
    this.operativoService.updateHistorialHerramienta(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  addHistorialHerramienta(e:any){
    this.operativoService.addHistorialHerramienta(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

}
