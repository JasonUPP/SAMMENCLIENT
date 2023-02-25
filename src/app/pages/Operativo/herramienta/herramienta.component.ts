import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { customJson } from 'src/app/Models/customJson';
import { getHerramientasDto } from 'src/app/Models/Dtos/Operativo/getHerramientasDto';
import { Herramienta } from 'src/app/Models/Operativo/HerramientaModel';
import { response } from 'src/app/Models/response';
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
        data.herramientas.forEach(herramienta => {
          herramienta.dias = this.calculateDias(herramienta.fechaVencimiento);
        });
        this.dataSource = data.herramientas;
        this.ubicaciones = data.ubicaciones;
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  deleteHerramienta(e:any){
    this.operativoService.deleteHerramienta(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);        
      },
      error: (e:any) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);        
      },
      complete: () => this.loading = false
    });  
  }

  updateHerramienta(e:any){
    this.operativoService.updateHerramientas(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);      
      },
      error: (e:any) => {        
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);        
      },
      complete: () => this.loading = false
    });    
  }

  newHerramienta(e:any){
    this.operativoService.newHerramienta(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
        
      },
      error: (e:any) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
        
      },
      complete: () => this.loading = false
    }); 
  }

  calculateDias(vigencia: Date):number {
    const today = new Date();
    if(typeof(vigencia) == 'string')
      vigencia = new Date(vigencia);    
    const difference_In_Time = vigencia.getTime() - today.getTime();
    const difference_In_Days:number = Math.round(difference_In_Time / (1000 * 3600 * 24));
    return difference_In_Days;
  }

}
