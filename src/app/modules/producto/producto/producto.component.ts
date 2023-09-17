import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from './producto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoDTO } from 'src/app/shared/interfaces/ProductoDTO';
import { FormProductoComponent } from './dialogs/form-producto/form-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  fcFiltro = new FormControl(null);

  dsProductos = new MatTableDataSource<ProductoDTO>();
  dcProductos = ['nIdProducto', 'sSKU', 'sDescripcion', 'sMarca', 'sPresentacion', 'sCantidad', 'Opciones'];
  @ViewChild('pagProductos', {static: false}) pagProductos! : MatPaginator;

  constructor(
    private service : ProductoService,
    private spinner : NgxSpinnerService,
    private router : Router,
    private dialog : MatDialog,
  ){
    this.fnLoadProductos();
  }

  fnLoadProductos(){
    this.spinner.show();
    this.service.getListProducto().subscribe({
      next : (res) => {
        if(res.success){
          this.dsProductos = new MatTableDataSource(res.data);
          this.dsProductos.paginator = this.pagProductos
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  filtrarProductos(){
    this.dsProductos.filter = this.fcFiltro.value!;
  }

  odFormProducto(producto? : ProductoDTO){
    if(producto){
      this.router.navigate(['/producto/producto/edit/'+producto.nIdProducto]);
    }else{
      const dialogResult = this.dialog.open(
        FormProductoComponent,
        {
          width:'600px',
          maxHeight: '80vh',
          disableClose : true,
          data  : {
            opcion : 1,
            comercio : null
          }
        }
      );
  
      dialogResult.afterClosed().subscribe( 
        res => {
          if(res.exito){
            this.fnLoadProductos();
          }
        }
      );
    }
  }
}
