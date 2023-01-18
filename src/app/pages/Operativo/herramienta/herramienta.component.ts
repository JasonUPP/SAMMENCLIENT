import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { customJson } from 'src/app/Models/customJson';
import { getHerramientasDto } from 'src/app/Models/Dtos/Operativo/getHerramientasDto';
import { Herramienta } from 'src/app/Models/Operativo/HerramientaModel';
import { OperativoService } from 'src/app/shared/services/operativo.service';
import { EstatusList } from 'src/assets/EstatusList';
import { TipoHerramientaList } from 'src/assets/TipoHerramientaList';

@Component({
  selector: 'app-herramienta',
  templateUrl: './herramienta.component.html',
  styleUrls: ['./herramienta.component.scss']
})
export class HerramientaComponent implements OnInit {
  loading:boolean = true;
  dataSource: Herramienta[] = [];
  requiredMsj:string = 'Este campo es requerido';
  estatusList: customJson[];
  tipoHerramienta: customJson[];
  ubicaciones: customJson[] = [];

  constructor(private operativoService: OperativoService){    
    this.estatusList = EstatusList; 
    this.tipoHerramienta = TipoHerramientaList;
  }

  ngOnInit(): void {
    this.getHerramientas();
  }

  getHerramientas(){
    this.operativoService.getHerramientas()
    .subscribe({
      next: (data:getHerramientasDto) => {
        this.dataSource = data.herramientas;
        this.ubicaciones = data.ubicaciones;
      },
      error: (error) => {
        notify(error.message, 'error', 2000);   
      },
      complete: () => this.loading = false
    });
  }

  deleteHerramienta(e:any){
    this.operativoService.deleteHerramienta(e).
    subscribe({
      next: (e:any) => {
        console.log(e);
        
      },
      error: (e:any) => {
        notify(e.message, 'error', 2000);        
      },
      complete: () => {
        
      }
    });  
  }

  updateHerramienta(e:any){
    this.operativoService.updateHerramientas(e).
    subscribe({
      next: (e:any) => {
        console.log(e);
        
      },
      error: (e:any) => {
        notify(e.message, 'error', 2000);        
      },
      complete: () => {
        
      }
    });    
  }

  newHerramienta(e:any){
    this.operativoService.newHerramienta(e).
    subscribe({
      next: (e:any) => {
        console.log(e);
        
      },
      error: (e:any) => {
        notify(e.message, 'error', 2000);        
      },
      complete: () => {
        
      }
    }); 
  }

}
