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

  constructor(private operativoService: OperativoService){}

  ngOnInit(): void {
    this.loading = true; 
    this.operativoService.getTest()
    .subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        this.loading = false;
        notify(error.error, 'error', 2000);   
      }
    });
  }

}
