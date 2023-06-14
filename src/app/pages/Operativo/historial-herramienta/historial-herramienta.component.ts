import { Component, OnInit } from '@angular/core';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import notify from 'devextreme/ui/notify';
import jsPDF from 'jspdf';
import { customJson } from 'src/app/Models/customJson';
import { getHistorialHerramientaDto } from 'src/app/Models/Dtos/Operativo/getHistorialHerramientaDto';
import { HistorialHerramienta } from 'src/app/Models/Operativo/historialHerramientaModel';
import { response } from 'src/app/Models/response';
import { OperativoService } from 'src/app/shared/services/operativo.service';
import { EstatusList } from 'src/assets/EstatusList';
import { TipoOperacion } from 'src/assets/TipoOperacion';
import { Unidad } from 'src/assets/Unidad';

@Component({
  selector: 'app-historial-herramienta',
  templateUrl: './historial-herramienta.component.html',
  styleUrls: ['./historial-herramienta.component.scss']
})
export class HistorialHerramientaComponent implements OnInit {
  loading: boolean = true;
  dataSource: HistorialHerramienta[] = [];
  filteredDataSource: HistorialHerramienta[] = [];
  auxData: HistorialHerramienta[] = [];
  auxSerieData: HistorialHerramienta[] = [];
  requiredMsj:string = 'Este campo es requerido';
  estatusList: customJson[];
  tipoOperacion: customJson[];
  unidad: customJson[];
  operadores: customJson[] = [];

  dropDownMarca:customJson[] = [];
  dropMarcaText:string = 'Marca:';

  dropDownModelo:customJson[] = [];
  dropModeloText:string = 'Modelo:';
  dropModeloDisabled: boolean = true;

  dropDownNumSerie:customJson[] = [];
  dropNumSerieText:string = 'Numero de Serie';
  dropNumSerieDisabled: boolean = true;

  tableDisabled:boolean = true;

  constructor(private operativoService: OperativoService){
    this.estatusList = EstatusList; 
    this.tipoOperacion = TipoOperacion;
    this.unidad = Unidad;
  }

  ngOnInit(): void {
    this.getHistorialHerramienta();
  }

  getHistorialHerramienta(){
    this.operativoService.getHistorialHerramienta()
    .subscribe({
      next: (data:getHistorialHerramientaDto) => {
        this.dataSource = data.historialHerramientas;
        this.filteredDataSource = data.historialHerramientas;  
        this.operadores = data.operadores;
        this.getMarcas();        
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  deleteHistorialHerramienta(e:any){
    this.operativoService.deleteHistorialHerramienta(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  updateHistorialHerramienta(e:any){
    e.data.marca = this.dropMarcaText;
    e.data.modelo = this.dropModeloText;
    e.data.numeroSerie = this.dropNumSerieText;
    debugger;
    this.operativoService.updateHistorialHerramienta(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  addHistorialHerramienta(e:any){
    this.operativoService.addHistorialHerramienta(e).
    subscribe({
      next: (e:response) => {
        notify(e.message, 'success', 2000);
      },
      error: (e) => {
        notify(typeof(e.error) == 'object' ? e.message : e.error , 'error', 2000);
      },
      complete: () => this.loading = false
    });
  }

  onExporting(e: any) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save('Historial.pdf');
    });
  }

  onMarcaClick(e:any){
    const {itemData} = e;
    this.dropMarcaText = e.itemData.nombre;
    this.dropModeloText = 'Seleccionar modelo';
    this.dropNumSerieText = 'Seleccionar Numero de serie';
    this.dropModeloDisabled = false;
    this.dropNumSerieDisabled = true;
    this.tableDisabled = true;
    this.auxData = this.dataSource.filter(x => x.marca == itemData.nombre);
    this.filteredDataSource = this.dataSource.filter(x => x.marca == itemData.nombre);
    this.getModelos();
  }

  onModeloClick(e:any){
    const {itemData} = e;
    this.dropModeloText = e.itemData.nombre;
    this.dropNumSerieText = 'Seleccionar Numero de serie';
    this.dropNumSerieDisabled = false;
    this.tableDisabled = true;
    this.auxSerieData = this.auxData.filter(x => x.modelo == itemData.nombre);
    this.filteredDataSource = this.auxData.filter(x => x.modelo == itemData.nombre);
    this.getNumSerie();
  }

  onNumSerieClick(e:any){
    const {itemData} = e;
    this.dropNumSerieText = e.itemData.nombre;
    this.tableDisabled = false;
    this.filteredDataSource = this.auxSerieData.filter(x => x.numeroSerie == itemData.nombre);
  }

  getMarcas(){
    let marcas:any[] = this.dataSource.map(historialH => historialH.marca);
    let marcasDuplicadas = [...new Set(this.findDuplicates(marcas))];
    marcasDuplicadas.forEach((nombre:any, id:any) => {      
      this.dropDownMarca.push({ id, nombre });
    })
  }

  getModelos(){
    let modelos:any[] = this.filteredDataSource.map(historialH => historialH.modelo);        
    let modelosDuplicados = [...new Set(this.findDuplicates(modelos))];
    this.dropDownModelo = [];
    modelosDuplicados.forEach((nombre:any, id:any) => this.dropDownModelo.push({id, nombre}));
  }

  getNumSerie(){    
    let numerosSerie:any[] = this.filteredDataSource.map(historialH => historialH.numeroSerie);    
    let itemsDuplicados = this.findDuplicates(numerosSerie);
    this.dropDownNumSerie = [];
    itemsDuplicados.forEach((nombre:any, id:any) => this.dropDownNumSerie.push({id, nombre}));
  }

  findDuplicates(arr:any[]){
    return arr.filter((item:any, index:any) => arr.indexOf(item) === index);
  }

  onInitNewRow(e:any){    
    e.data.marca = this.dropMarcaText;
    e.data.modelo = this.dropModeloText;
    e.data.numeroSerie = this.dropNumSerieText;
  }

}
