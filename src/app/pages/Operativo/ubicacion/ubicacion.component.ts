import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Ubicacion } from 'src/app/Models/Operativo/ubicacionModel';
import { response } from 'src/app/Models/response';
import { OperativoService } from 'src/app/shared/services/operativo.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {
  loading: boolean = true;
  dataSource: Ubicacion[] = [];
  requiredMsj:string = 'Este campo es requerido';

  constructor(private operativoService: OperativoService){}

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.operativoService.getUbicaciones()
    .subscribe({
      next: (data:Ubicacion[]) => {
        this.dataSource = data;
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  remove(e:any){
    this.operativoService.deleteUbicacion(e)
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
    this.operativoService.updateUbicacion(e)
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
    this.operativoService.newUbicacion(e)
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
