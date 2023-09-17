import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UnidadMedidaDTO } from 'src/app/shared/interfaces/UnidadMedidaDTO';
import { UnidadMedidaService } from './unidad-medida.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FormUnidadMedidaComponent } from './dialogs/form-unidad-medida/form-unidad-medida.component';

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.css']
})
export class UnidadMedidaComponent {
  fcFiltro = new FormControl(null);

  dsUnidadesMedida = new MatTableDataSource<UnidadMedidaDTO>();
  dcUnidadesMedida = ['nIdUnidadMedida', 'sUnidadMedida', 'sSimbolo', 'sDescripcion', 'Opciones'];
  @ViewChild('pagUnidadesMedida', {static: false}) pagUnidadesMedida! : MatPaginator;

  constructor(
    private service : UnidadMedidaService,
    private spinner : NgxSpinnerService,
    private dialog : MatDialog,
  ){
    this.fnLoadUnidadesMedida();
  }

  fnLoadUnidadesMedida(){
    this.spinner.show();
    this.service.getListUnidadMedida().subscribe({
      next : (res) => {
        if(res.success){
          this.dsUnidadesMedida = new MatTableDataSource(res.data);
          this.dsUnidadesMedida.paginator = this.pagUnidadesMedida
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  filtrarUnidadesMedida(){
    this.dsUnidadesMedida.filter = this.fcFiltro.value!;
  }

  odFormUnidadMedida(unidadMedida? : UnidadMedidaDTO){
    const dialogResult = this.dialog.open(
      FormUnidadMedidaComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          opcion : unidadMedida == null ? 1 : 2,
          unidadMedida : unidadMedida
        }
      }
    );

    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnLoadUnidadesMedida();
        }
      }
    );
  }
}
