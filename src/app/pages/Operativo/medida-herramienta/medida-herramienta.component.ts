import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { customJson } from 'src/app/Models/customJson';
import { MedidaHerramienta } from 'src/app/Models/Operativo/medidaHerramientaModel';
import { response } from 'src/app/Models/response';
import { OperativoService } from 'src/app/shared/services/operativo.service';
import { EstatusList } from 'src/assets/EstatusList';
import { TipoMedidaHerramientaList } from 'src/assets/TipoMedidaHerramienta';

@Component({
  selector: 'app-medida-herramienta',
  templateUrl: './medida-herramienta.component.html',
  styleUrls: ['./medida-herramienta.component.scss']
})
export class MedidaHerramientaComponent implements OnInit {
  loading: boolean = true;
  dataSource: MedidaHerramienta[] = [];
  requiredMsj:string = 'Este campo es requerido';
  estatusList: customJson[];
  tipoMedidaHerramienta: customJson[];
  flag: boolean = true;


  constructor(private operativoService: OperativoService){
    this.estatusList = EstatusList;
    this.tipoMedidaHerramienta = TipoMedidaHerramientaList;
  }

  ngOnInit(): void {
    this.getMedidasHerramientas();
  }

  getMedidasHerramientas(){
    this.operativoService.getMedidaHerramientas()
    .subscribe({
      next: (data:MedidaHerramienta[]) => {
        this.dataSource = data;
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  deleteMedidaHerramienta(e:any){
    this.operativoService.deleteMedidaHerramienta(e).
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

  UpdateMedidaHerramienta(e:any){
    this.operativoService.updateMedidaHerramienta(e).
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

  NewMedidaHerramienta(e:any){
    this.operativoService.newMedidaHerramienta(e).
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

  click(e:any){
    debugger;
    this.flag = !this.flag;

  }

}
