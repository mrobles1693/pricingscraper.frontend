import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BotExecutionService } from './bot-execution.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { BotExecutionDTO } from 'src/app/shared/interfaces/BotExecutionDTO';

@Component({
  selector: 'app-bot-execution',
  templateUrl: './bot-execution.component.html',
  styleUrls: ['./bot-execution.component.css']
})
export class BotExecutionComponent {
  fcFiltro = new FormControl(null);

  dsBotExecutions = new MatTableDataSource<BotExecutionDTO>();
  dcBotExecutions = ['nIdBotExecution', 'nIdTurno', 'sFechaIni', 'sFechaFin', 'nMinutos', 'Opciones'];
  @ViewChild('pagBotExecutions', {static: false}) pagBotExecutions! : MatPaginator;

  constructor(
    private service : BotExecutionService,
    private spinner : NgxSpinnerService,
    private dialog : MatDialog,
  ){
    this.fnLoadBotExecutions();
  }

  fnLoadBotExecutions(){
    this.spinner.show();
    this.service.getListBotExecution().subscribe({
      next : (res) => {
        if(res.success){
          this.dsBotExecutions = new MatTableDataSource(res.data);
          this.dsBotExecutions.paginator = this.pagBotExecutions
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  filtrarBotExecutions(){
    this.dsBotExecutions.filter = this.fcFiltro.value!;
  }

  odVerReporte(botExecution? : BotExecutionDTO){
    // const dialogResult = this.dialog.open(
    //   FormBotExecutionComponent,
    //   {
    //     width:'600px',
    //     maxHeight: '80vh',
    //     disableClose : true,
    //     data  : {
    //       opcion : botExecution == null ? 1 : 2,
    //       botExecution : botExecution
    //     }
    //   }
    // );

    // dialogResult.afterClosed().subscribe( 
    //   res => {
    //     if(res.exito){
    //       this.fnLoadBotExecutions();
    //     }
    //   }
    // );
  }
}
