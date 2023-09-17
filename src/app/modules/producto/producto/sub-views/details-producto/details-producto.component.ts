import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from '../../producto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoDTO } from 'src/app/shared/interfaces/ProductoDTO';
import Swal from 'sweetalert2';
import { FormProductoComponent } from '../../dialogs/form-producto/form-producto.component';
import { FormProductoCategoriaComponent } from '../../dialogs/form-producto-categoria/form-producto-categoria.component';

@Component({
  selector: 'app-details-producto',
  templateUrl: './details-producto.component.html',
  styleUrls: ['./details-producto.component.css']
})
export class DetailsProductoComponent {

  producto : ProductoDTO | null = null;

  constructor(
    private dialog : MatDialog,
    private service : ProductoService,
    private spinner: NgxSpinnerService,
    private router : Router,
    private route : ActivatedRoute,
  ){
    var idProducto = this.route.snapshot.paramMap.get('idProducto');
    if(idProducto === null || idProducto === undefined || isNaN(Number(idProducto))){
      this.router.navigate(['/producto/producto']);
    }
    this.fnLoadProducto(Number(idProducto));
  }

  //#region LOAD DATA
  fnLoadProducto(nIdProducto : number){
    this.spinner.show();
    this.service.getProductoByID(nIdProducto).subscribe({
      next: (res) => {
        if(res.success){
          if(res.data == null){
            Swal.fire({
              icon: 'warning',
              text: 'No se encontrarón los datos del producto.',
            });
            this.router.navigate(['/producto/producto']);
          } else {
            this.producto = res.data;
          }
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }
  //#endregion

  //#region DIALOGS
  odFormProducto(){
    const dialogResult = this.dialog.open(
      FormProductoComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          opcion : 2,
          producto : this.producto
        }
      }
    );

    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnLoadProducto(this.producto?.nIdProducto!);
        }
      }
    );
  }

  odFormCategorias(){
    const dialogResult = this.dialog.open(
      FormProductoCategoriaComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        data  : {
          producto : this.producto
        }
      }
    );
  }
  //#endregion

  fnRegresar(){
    this.router.navigate(['/producto/producto']);
  }

}
