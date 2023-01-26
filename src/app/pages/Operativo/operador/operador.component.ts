import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Operador } from 'src/app/Models/Operativo/operadorModel';
import { response } from 'src/app/Models/response';
import { OperativoService } from 'src/app/shared/services/operativo.service';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.scss']
})
export class OperadorComponent implements OnInit {
  loading: boolean = true;
  dataSource: Operador[] = [];
  requiredMsj:string = 'Este campo es requerido';

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
}
