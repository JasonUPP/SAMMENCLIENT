import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { forkJoin } from 'rxjs';
import { customJson } from 'src/app/Models/customJson';
import { cursosDto } from 'src/app/Models/Dtos/Operativo/cursosDto';
import { Operador } from 'src/app/Models/Operativo/operadorModel';
import { OperativoService } from 'src/app/shared/services/operativo.service';
import { CursoRequerido } from 'src/assets/CursoRequerido';
import { EstatusCursos } from 'src/assets/EstatusCursos';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  loading: boolean = true;
  cursoRequerido:customJson[] = CursoRequerido;
  estatusCurso:customJson[] = EstatusCursos;
  dropDownData:Operador[] = [];
  gridData:cursosDto[] = [];
  auxGridData:cursosDto[] = [];
  requiredMsj:string = 'Este campo es requerido';
  dropDownText:string = 'Selecionar Operador...';

  constructor(private operativoService: OperativoService){
    this.get();

  }

  ngOnInit(): void {
  }

  get(){
    const operadores$ = this.operativoService.getOperadores();
    const cursos$ = this.operativoService.getCursos();
    const relaciones$ = this.operativoService.getRelacion();
    forkJoin([operadores$, cursos$, relaciones$]).
    subscribe({
      next: (response:any) => {
        this.dropDownData = response[0];
        this.auxGridData = response[1];
        console.log(response);
        
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    })
  }

  onItemClick(e:any){
    console.log(e);
    const {itemData} = e;
    const {id, nombre} = itemData;
    this.dropDownText = nombre;
    this.operativoService.getCursosPorOperador(id).
    subscribe({
      next: (res:cursosDto[]) => {
        console.log(res);
        if(res.length == 0){
          notify('Se deben configurar los cursos para este operador', 'warning', 2500);
          let x = this.auxGridData;
          x.forEach(curso => {
            curso.Estatus = 0;
          });
          console.log(x);
          
          this.gridData = x;
        }
        
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

}
