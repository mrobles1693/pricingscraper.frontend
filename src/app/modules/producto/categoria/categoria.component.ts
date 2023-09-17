import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaDTO } from 'src/app/shared/interfaces/CategoriaDTO';
import { CategoriaService } from './categoria.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FormCategoriaComponent } from './dialogs/form-categoria/form-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  fcFiltro = new FormControl(null);

  dsCategorias = new MatTableDataSource<CategoriaDTO>();
  dcCategorias = ['nIdCategoria', 'sCategoria', 'sDescripcion', 'Opciones'];
  @ViewChild('pagCategorias', {static: false}) pagCategorias! : MatPaginator;

  constructor(
    private service : CategoriaService,
    private spinner : NgxSpinnerService,
    private dialog : MatDialog,
  ){
    this.fnLoadCategorias();
  }

  fnLoadCategorias(){
    this.spinner.show();
    this.service.getListCategoria().subscribe({
      next : (res) => {
        if(res.success){
          this.dsCategorias = new MatTableDataSource(res.data);
          this.dsCategorias.paginator = this.pagCategorias
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  filtrarCategorias(){
    this.dsCategorias.filter = this.fcFiltro.value!;
  }

  odFormCategoria(categoria? : CategoriaDTO){
    const dialogResult = this.dialog.open(
      FormCategoriaComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          opcion : categoria == null ? 1 : 2,
          categoria : categoria
        }
      }
    );

    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnLoadCategorias();
        }
      }
    );
  }
}
