import { Component, ViewChild } from '@angular/core';
import { BotExecutionDTO, BotExecutionReportDTO } from 'src/app/shared/interfaces/BotExecutionDTO';
import { BotExecutionService } from '../../bot-execution.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-details-bot-execution',
  templateUrl: './details-bot-execution.component.html',
  styleUrls: ['./details-bot-execution.component.css']
})
export class DetailsBotExecutionComponent {
  botExecution : BotExecutionDTO | null = null;

  // fcFiltro = new FormControl(null);
  dsRepo = new MatTableDataSource<any>();
  dcRepo = [];
  @ViewChild('pagRepo', {static: false}) pagRepo! : MatPaginator;

  constructor(
    private service : BotExecutionService,
    private spinner: NgxSpinnerService,
    private router : Router,
    private route : ActivatedRoute,
  ){
    var idBotExecution = this.route.snapshot.paramMap.get('idBotExecution');
    if(idBotExecution === null || idBotExecution === undefined || isNaN(Number(idBotExecution))){
      this.router.navigate(['/producto/bot-execution']);
    }
    this.fnLoadBotExecution(Number(idBotExecution));
    this.fnLoadRepoBotExecution(Number(idBotExecution));
  }

  //#region LOAD DATA
  fnLoadBotExecution(idBotExecution : number){
    this.spinner.show();
    this.service.getBotExecution(idBotExecution).subscribe({
      next: (res) => {
        if(res.success){
          if(res.data == null){
            Swal.fire({
              icon: 'warning',
              text: 'No se encontrarón los datos de la ejecución.',
            });
            this.router.navigate(['/producto/bot-execution']);
          } else {
            this.botExecution = res.data;
          }
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  fnLoadRepoBotExecution(idBotExecution : number){
    this.spinner.show();
    this.service.getBotExecutionRepo(idBotExecution).subscribe({
      next: (res) => {
        if(res.success){
          this.fnListRepoPersonalizar(res.data);
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }
  //#endregion

  fnListRepoPersonalizar(list : BotExecutionReportDTO[]){
    var tempList : any = [];
    var temp : any = null;
    list.forEach(element => {
      if(temp == null){
        temp = new Map();
        temp.set('SKU', element.sSKU);
        temp.set('Descripcion', element.sDescripcion);
        temp.set(element.sComercio + '-Precio', element.nPrecio);
        temp.set(element.sComercio + '-Precio Oferta', element.nPrecioOferta);
        temp.set(element.sComercio + '-Precio Tarjeta', element.nPrecioTarjeta);
      } else if(temp.get('SKU') == element.sSKU){
        temp.set(element.sComercio + '-Precio', element.nPrecio);
        temp.set(element.sComercio + '-Precio Oferta', element.nPrecioOferta);
        temp.set(element.sComercio + '-Precio Tarjeta', element.nPrecioTarjeta);
      } else {
        tempList.push(temp);
        let tempDC : any = Array.from(temp.keys());
        if(tempDC.length > this.dcRepo.length) {
          this.dcRepo = tempDC;
        }

        temp = new Map();
        temp.set('SKU', element.sSKU);
        temp.set('Descripcion', element.sDescripcion);
        temp.set(element.sComercio + '-Precio', element.nPrecio);
        temp.set(element.sComercio + '-Precio Oferta', element.nPrecioOferta);
        temp.set(element.sComercio + '-Precio Tarjeta', element.nPrecioTarjeta);
      }
    });
    tempList.push(temp);
    let tempDC : any = Array.from(temp.keys());
    if(tempDC.length > this.dcRepo.length) {
      this.dcRepo = tempDC;
    }
    
    this.dsRepo = new MatTableDataSource(tempList);
    this.dsRepo.paginator = this.pagRepo;
  }

  fnGetHeader(dc : any){
    if(String(dc).includes('-')){
      return '<p class="m-0">'+String(dc).split('-')[0]+'<br>'+String(dc).split('-')[1]+'</p>';
    }
    return dc;
  }

  filtrarRepo(){
    // this.dsRepo.filter = this.fcFiltro.value!;
  }

  fnRegresar(){
    this.router.navigate(['/producto/bot-execution']);
  }
}
