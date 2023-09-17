import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MarcaDTO } from 'src/app/shared/interfaces/MarcaDTO';
import { MarcaService } from './marca.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormMarcaComponent } from './dialogs/form-marca/form-marca.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {
  fcFiltro = new FormControl(null);

  dsMarcas = new MatTableDataSource<MarcaDTO>();
  dcMarcas = ['nIdMarca', 'sMarca', 'sDescripcion', 'Opciones'];
  @ViewChild('pagMarcas', {static: false}) pagMarcas! : MatPaginator;

  constructor(
    private service : MarcaService,
    private spinner : NgxSpinnerService,
    private dialog : MatDialog,
  ){
    this.fnLoadMarcas();
  }

  fnLoadMarcas(){
    this.spinner.show();
    this.service.getListMarca().subscribe({
      next : (res) => {
        if(res.success){
          this.dsMarcas = new MatTableDataSource(res.data);
          this.dsMarcas.paginator = this.pagMarcas
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  filtrarMarcas(){
    this.dsMarcas.filter = this.fcFiltro.value!;
  }

  odFormMarca(marca? : MarcaDTO){
    const dialogResult = this.dialog.open(
      FormMarcaComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          opcion : marca == null ? 1 : 2,
          marca : marca
        }
      }
    );

    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnLoadMarcas();
        }
      }
    );
  }
}
