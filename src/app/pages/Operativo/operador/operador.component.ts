import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { customJson } from 'src/app/Models/customJson';
import { Operador } from 'src/app/Models/Operativo/operadorModel';
import { response } from 'src/app/Models/response';
import { OperativoService } from 'src/app/shared/services/operativo.service';
import { EstatusOperador } from 'src/assets/EstatusOperador';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.scss']
})
export class OperadorComponent implements OnInit {
  loading: boolean = true;
  dataSource: Operador[] = [];
  requiredMsj:string = 'Este campo es requerido';
  estatusOperador:customJson[] = EstatusOperador;


  constructor(private operativoService: OperativoService){}

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.operativoService.getOperadores()
    .subscribe({
      next: (data:Operador[]) => {
        this.dataSource = data;
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  remove(e:any){
    this.operativoService.deleteOperador(e)
    .subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  update(e:any){
    this.operativoService.updateOperador(e)
    .subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  add(e:any){
    this.operativoService.newOperador(e)
    .subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }  

  onCellPrepared(e:any){
    if(e.rowType == 'data'){
      if(e.column.dataField == 'estatus'){
        switch(e.values[6]){
          case 0:
            e.cellElement.style.backgroundColor = '#FFD455';
            e.cellElement.style.color = 'white';
            break;
          case 1:            
            e.cellElement.style.backgroundColor = '#8BC34A';
            e.cellElement.style.color = 'white';
            break;
          case 2:
            e.cellElement.style.backgroundColor = '#f24336';
            e.cellElement.style.color = 'white';
            break;
          default:
            break;
        };
      }
    }
  }

}
