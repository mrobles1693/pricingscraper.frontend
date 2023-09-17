import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectDTO } from 'src/app/shared/interfaces/SelectDTO';
import { ProductoService } from '../../producto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoDTO } from 'src/app/shared/interfaces/ProductoDTO';
import { CategoriaDTO } from 'src/app/shared/interfaces/CategoriaDTO';
import { ProductoCategoriaDTO } from 'src/app/shared/interfaces/ProductoCategoriaDTO';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-form-producto-categoria',
  templateUrl: './form-producto-categoria.component.html',
  styleUrls: ['./form-producto-categoria.component.css']
})
export class FormProductoCategoriaComponent {

  dsCategoria = new MatTableDataSource<CategoriaDTO>();
  dcCategoria = ['sCategoria', 'opcion'];
  
  listCategoriasDisp : CategoriaDTO[] = [];

  fcCategoria = new FormControl<any>(null, [Validators.required]);
  
  constructor(
    public dialogRef : MatDialogRef<FormProductoCategoriaComponent>,
    private service : ProductoService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {producto : ProductoDTO} 
  ){
    this.fnIniciarForm();
  }

  //#region LOAD DATA
  fnLoadCategoriaDisp(){
    this.spinner.show();
        this.service.getListCategoriasDispByProducto(this.data.producto.nIdProducto!).subscribe({
          next: (res) => {
            if(res.success){
              this.listCategoriasDisp = res.data;
            }
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
  }

  fnLoadCategoriaSelect(){
    this.spinner.show();
        this.service.getListCategoriasByProducto(this.data.producto.nIdProducto!).subscribe({
          next: (res) => {
            if(res.success){
              this.dsCategoria = new MatTableDataSource(res.data);
            }
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
  }
  //#endregion

  //#region EVENTOS FORMULARIO
  fnIniciarForm(){
    this.fnLoadCategoriaSelect();
    this.fnLoadCategoriaDisp();
  }

  isInvalidFc(fc : FormControl){
    return (fc.status == 'INVALID' && fc.touched) ? true : false;
  }

  getErrorFC(fc : FormControl, msjPattern? : string, minlengt? : number, maxlengt? : number, msjMin? : string,  msjMax? : string){
    return fc.hasError('required') ? 'Campo requerido' 
    : fc.hasError('pattern') ? msjPattern
    : fc.hasError('minlength') ? 'Mínimo ' + minlengt + ' caracteres.'
    : fc.hasError('maxlength') ? 'Máximo ' + maxlengt + ' caracteres.'
    : fc.hasError('min') ? msjMin
    : fc.hasError('max') ? msjMax : '';
  }

  isValidForm(){
    this.fcCategoria.markAsTouched();
    if(this.isInvalidFc(this.fcCategoria)) return false;
    return true;
  }
  
  fnAgregar(){
    if(this.isValidForm()){
      var productoCategoria : ProductoCategoriaDTO = { 
        nIdCategoria : this.fcCategoria.value,
        nIdProducto : this.data.producto.nIdProducto!,
      }

      this.spinner.show();
      this.service.postInsCategoriaProducto(productoCategoria).subscribe({
        next: (res : ApiResponse<SqlRspDTO>) => {
          this.fnMostrarRespuesta(res);
          if(res.success){
            this.fcCategoria.setValue(null);
            this.fnIniciarForm();
          }
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => this.spinner.hide()
      });
    }
  }

  fnEliminar(categoria : CategoriaDTO){
    var productoCategoria : ProductoCategoriaDTO = { 
      nIdCategoria : categoria.nIdCategoria!,
      nIdProducto : this.data.producto.nIdProducto!,
    }

    this.spinner.show();
    this.service.postDelCategoriaProducto(productoCategoria).subscribe({
      next: (res : ApiResponse<SqlRspDTO>) => {
        this.fnMostrarRespuesta(res);
        this.fnIniciarForm();
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => this.spinner.hide()
    });
  }
  
  fnMostrarRespuesta(res : ApiResponse<SqlRspDTO>){
    Swal.fire({
      icon: res.success ? 'success' : 'error',
      text: res.data.sMsj,
    });
  }
  //#endregion
}
