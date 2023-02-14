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
  cursosRequeridosCount:number = 0;

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
        this.auxGridData.forEach(curso => {          
          if(curso.requerido == 1) this.cursosRequeridosCount ++;          
        });
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    })
  }

  onItemClick(e:any){
    // console.log(e);
    const {itemData} = e;
    const {id, nombre} = itemData;
    this.dropDownText = nombre;
    this.operativoService.getCursosPorOperador(id).
    subscribe({
      next: (res:cursosDto[]) => {
        // console.log(res);
        if(res.length == 0){
          notify('Se deben configurar los cursos para este operador', 'warning', 2500);
          let aux = this.auxGridData;
          aux.forEach(curso => {
            curso.vigencia = new Date();
            curso.Estatus = 0;
          });        
          this.gridData = aux;
        }
        
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  saving(e:any){
    console.log(e);
    const {changes} = e;
    let requeridosModificados:number = 0;
    changes.forEach((change:any) => {
      if(change.data.requerido == 1) requeridosModificados ++;
    });
    if(requeridosModificados < this.cursosRequeridosCount)
      notify('Se deben establecer las vigencias para todos los cursos Requeridos', 'warning', 3000);
  }

  onOptionChanged(e:any){
    const {name} = e;
    if(name == 'editing'){
      const {fullName} = e;
      if(fullName == 'editing.changes'){
        const last:number = e.value.length - 1;
        const actualvalue = e.value[last];
        let fullRow = this.gridData.find(f => f.item == actualvalue.key);        
        fullRow!.vigencia = actualvalue.data.vigencia;
        this.checkVigencia(fullRow!.vigencia);//ver como actualizar el estatus del curso                
      }
    }
  }

  checkVigencia(vigencia:Date){
    const today = new Date();
    const difference_In_Time = today.getTime() - vigencia.getTime();
    const difference_In_Days:number = Math.round(difference_In_Time / (1000 * 3600 * 24));
    if(difference_In_Days > 0 && difference_In_Days <= 30){
      //proximo a vencer
    }
    else if(difference_In_Days > 30){
      //ya expiro, osea, ya valio verga
    }
  }

  customText(e:any){
    const value:string = e.valueText;
    const parts = value.split('/');
    return `${parts[1]}/${parts[0]}/${parts[2]}`;    
  }

}
