import { Component, OnInit } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { forkJoin } from 'rxjs';
import { customJson } from 'src/app/Models/customJson';
import { cursosDto } from 'src/app/Models/Dtos/Operativo/cursosDto';
import { Operador } from 'src/app/Models/Operativo/operadorModel';
import { response } from 'src/app/Models/response';
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
  idOperadorSelected:number = 0;
  isFirstTime:boolean = false;

  constructor(private operativoService: OperativoService){
    this.get();
    // hacer que al obtener los cursos se actualize el estatus del operador
    // checar si coincide el estatus actual con el que deberia ser
    // al actualizar los cursos, tambien actualizar el estatus del operador
    // tambien el añadir todos los cursos de un jale
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
    this.idOperadorSelected = id;
    this.dropDownText = nombre;
    this.operativoService.getCursosPorOperador(id).
    subscribe({
      next: (res:cursosDto[]) => {
        if(res.length == 0){
          this.isFirstTime = true;
          notify('Se deben configurar los cursos para este operador', 'warning', 2500);
          let aux = this.auxGridData;
          aux.forEach(curso => {
            curso.vigencia = new Date();
            curso.estatus = 0;
          });          
          this.gridData = aux;
        }
        else{
          this.isFirstTime = false;
          res.forEach(item => {
            item.estatus = this.checkVigencia(item.vigencia);
          });          
          const anonymous = {
            changes: res
          };
          this.updateCursos(anonymous);
          this.gridData = res;        
        }
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  onSaving(e:any){
    if(this.isFirstTime)
      this.newCursos();
    else  //Means the user is updating  
      this.updateCursos(e);    

  }

  onOptionChanged(e:any){
    const {name} = e;   
    if(name == 'editing'){
      const {fullName} = e;
      if(fullName == 'editing.changes'){        
        if(e.value.length == 0) return; //Is Saving
        const last:number = e.value.length - 1;
        const actualvalue = e.value[last];
        let fullRow = this.gridData.find(f => f.item == actualvalue.key);       
        fullRow!.vigencia = actualvalue.data.vigencia;
        fullRow!.estatus = this.checkVigencia(fullRow!.vigencia);        
      }
    }
  }

  checkVigencia(vigencia:Date): number {
    const today = new Date();
    if(typeof(vigencia) == 'string')
      vigencia = new Date(vigencia);    
    const difference_In_Time = vigencia.getTime() - today.getTime();
    const difference_In_Days:number = Math.round(difference_In_Time / (1000 * 3600 * 24));    
    if(difference_In_Days >= 0 && difference_In_Days <= 30)
      return 2;
    
    else if(difference_In_Days < 0)
      return 3;
    
    return 1;
  }

  customText(e:any){
    const value:string = e.valueText;
    const parts = value.split('/');
    return `${parts[1]}/${parts[0]}/${parts[2]}`;    
  }

  newCursos():void {
    let requeridosModificados:number = 0;
  
    this.gridData.forEach(curso => {
      if(curso.estatus != 0 && curso.requerido == 1)
        requeridosModificados ++;
    });

    if(requeridosModificados < this.cursosRequeridosCount){
      notify(`Se deben establecer las vigencias para todos los cursos Requeridos. Restantes: ${this.cursosRequeridosCount - requeridosModificados}`, 'warning', 3000);      
      return;
    };

    this.operativoService.newCursosByOperador(this.idOperadorSelected, this.gridData).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);        
      },
      error: (e:any) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);        
      },
      complete: () => this.loading = false
    });
  }

  updateCursos(e:any):void {
    const {changes} = e;
    let cursosModificados:cursosDto[] = [];
    if(this.gridData.length == 0)//Is updating when operador is selected
      cursosModificados = changes;
    else{
      changes.forEach((change:any) => {  
        let curso = this.gridData.filter(f => f.item == change.key);
        cursosModificados.push(curso[0]);
      });
    }    

    this.operativoService.updateCursosOperador(this.idOperadorSelected, cursosModificados).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);        
      },
      error: (e:any) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);        
      },
      complete: () => this.loading = false
    });
  }

  onCellPrepared(e:any){
    if(e.rowType == 'data'){
      if(e.column.dataField == 'estatus'){
        switch(e.values[4]){
          case 0:
            break;
          case 1:            
            e.cellElement.style.backgroundColor = '#8BC34A';
            e.cellElement.style.color = 'white';
            break;
          case 2:            
            e.cellElement.style.backgroundColor = '#FFD455';
            e.cellElement.style.color = 'white';
            break;
          case 3:
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
