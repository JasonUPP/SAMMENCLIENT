import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { OperativoService } from 'src/app/shared/services/operativo.service';

@Component({
  selector: 'app-herramienta',
  templateUrl: './herramienta.component.html',
  styleUrls: ['./herramienta.component.scss']
})
export class HerramientaComponent implements OnInit {
  loading = false;
  dataSource: any;
  headers: any;

  constructor(private operativoService: OperativoService){}

  ngOnInit(): void {
    this.getHerramientas();
  }

  getHerramientas(){
    this.loading = true; 
    this.operativoService.getHerramientas()
    .subscribe({
      next: (data:any) => {     
        this.headers = Object.getOwnPropertyNames(data[0]);        
        this.dataSource = data;
      },
      error: (error) => {
        notify(error.error, 'error', 2000);   
      },
      complete: () => this.loading = false
    });
  }

}
