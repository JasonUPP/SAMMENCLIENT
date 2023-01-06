import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { OperativoService } from 'src/app/shared/services/operativo.service';

@Component({
  selector: 'app-medida-herramienta',
  templateUrl: './medida-herramienta.component.html',
  styleUrls: ['./medida-herramienta.component.scss']
})
export class MedidaHerramientaComponent implements OnInit {
  loading: boolean = true;
  dataSource: any;

  constructor(private operativoService: OperativoService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getMedidasHerramientas(){
    this.operativoService.getMedidaHerramientas()
    .subscribe({
      next: (data:any) => {
        this.dataSource = data;
      },
      error: (e) => {
        notify(e.error, 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }  

}
