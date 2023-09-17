import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PresentacionDTO } from 'src/app/shared/interfaces/PresentacionDTO';
import { PresentacionService } from './presentacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FormPresentacionComponent } from './dialogs/form-presentacion/form-presentacion.component';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent {
  fcFiltro = new FormControl(null);

  dsPresentaciones = new MatTableDataSource<PresentacionDTO>();
  dcPresentaciones = ['nIdPresentacion', 'sPresentacion', 'sDescripcion', 'Opciones'];
  @ViewChild('pagPresentaciones', {static: false}) pagPresentaciones! : MatPaginator;

  constructor(
    private service : PresentacionService,
    private spinner : NgxSpinnerService,
    private dialog : MatDialog,
  ){
    this.fnLoadPresentaciones();
  }

  fnLoadPresentaciones(){
    this.spinner.show();
    this.service.getListPresentacion().subscribe({
      next : (res) => {
        if(res.success){
          this.dsPresentaciones = new MatTableDataSource(res.data);
          this.dsPresentaciones.paginator = this.pagPresentaciones
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  filtrarPresentaciones(){
    this.dsPresentaciones.filter = this.fcFiltro.value!;
  }

  odFormPresentacion(presentacion? : PresentacionDTO){
    const dialogResult = this.dialog.open(
      FormPresentacionComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          opcion : presentacion == null ? 1 : 2,
          presentacion : presentacion
        }
      }
    );

    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnLoadPresentaciones();
        }
      }
    );
  }
}
