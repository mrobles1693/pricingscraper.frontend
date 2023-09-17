import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComercioDTO } from 'src/app/shared/interfaces/ComercioDTO';
import { ComercioService } from './comercio.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FormComercioComponent } from './dialogs/form-comercio/form-comercio.component';

@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent {
  fcFiltro = new FormControl(null);

  dsComercios = new MatTableDataSource<ComercioDTO>();
  dcComercios = ['nIdComercio', 'sComercio', 'sDescripcion', 'sUrl', 'Opciones'];
  @ViewChild('pagComercios', {static: false}) pagComercios! : MatPaginator;

  constructor(
    private service : ComercioService,
    private spinner : NgxSpinnerService,
    private dialog : MatDialog,
  ){
    this.fnLoadComercios();
  }

  fnLoadComercios(){
    this.spinner.show();
    this.service.getListComercio().subscribe({
      next : (res) => {
        if(res.success){
          this.dsComercios = new MatTableDataSource(res.data);
          this.dsComercios.paginator = this.pagComercios
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  filtrarComercios(){
    this.dsComercios.filter = this.fcFiltro.value!;
  }

  odFormComercio(comercio? : ComercioDTO){
    const dialogResult = this.dialog.open(
      FormComercioComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          opcion : comercio == null ? 1 : 2,
          comercio : comercio
        }
      }
    );

    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnLoadComercios();
        }
      }
    );
  }
}
