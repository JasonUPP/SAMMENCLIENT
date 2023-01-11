import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { customJson } from 'src/app/Models/customJson';
import { getHerramientasDto } from 'src/app/Models/Dtos/Operativo/getHerramientasDto';
import { Herramienta } from 'src/app/Models/Operativo/HerramientaModel';
import { OperativoService } from 'src/app/shared/services/operativo.service';
import { EstatusList } from 'src/assets/EstatusList';

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
  ubicaciones: customJson[] = [];

  constructor(private operativoService: OperativoService){    
    this.estatusList = EstatusList; 
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
        notify(error.error, 'error', 2000);   
      },
      complete: () => this.loading = false
    });
  }

}
