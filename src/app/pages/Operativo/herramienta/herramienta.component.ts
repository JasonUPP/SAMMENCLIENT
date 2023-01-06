import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { OperativoService } from 'src/app/shared/services/operativo.service';

@Component({
  selector: 'app-herramienta',
  templateUrl: './herramienta.component.html',
  styleUrls: ['./herramienta.component.scss']
})
export class HerramientaComponent implements OnInit {
  loading:boolean = true;
  dataSource: any;

  constructor(private operativoService: OperativoService){}

  ngOnInit(): void {
    this.getHerramientas();
  }

  getHerramientas(){
    this.operativoService.getHerramientas()
    .subscribe({
      next: (data:any) => {     
        this.dataSource = data;
      },
      error: (error) => {
        notify(error.error, 'error', 2000);   
      },
      complete: () => this.loading = false
    });
  }

}
