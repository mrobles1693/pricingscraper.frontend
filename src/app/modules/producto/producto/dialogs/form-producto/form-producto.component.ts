import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from '../../producto.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoDTO } from 'src/app/shared/interfaces/ProductoDTO';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';
import { SelectDTO } from 'src/app/shared/interfaces/SelectDTO';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent {
  exito = false;

  listMarca : SelectDTO[] = [];
  listPresentacion : SelectDTO[] = [];
  listUnidadMedida : SelectDTO[] = [];

  nIdProducto : number | null = null;
  fcSKU = new FormControl<any>(null, [Validators.required]);
  fcDescripcion = new FormControl<any>(null, [Validators.required]);
  fcMarca = new FormControl<any>(null, [Validators.required]);
  fcPresentacion = new FormControl<any>(null, [Validators.required]);
  fcUnidadMedida = new FormControl<any>(null, [Validators.required]);
  fcCantidad = new FormControl<any>(null, [Validators.required, Validators.min(1)]);
  
  constructor(
    public dialogRef : MatDialogRef<FormProductoComponent>,
    private service : ProductoService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {opcion : number, producto? : ProductoDTO} 
  ){
    this.fnIniciarForm();
  }

  get sTitulo() : string {
    if (this.data.opcion == 1) { return 'REGISTRAR'; } 
    if (this.data.opcion == 2) { return 'EDITAR'; } 
    return ''; 
  }

  //#region EVENTOS DIALOG
  onClose() {
    this.dialogRef.close({exito : this.exito});
  }
  //#endregion

  //#region LOAD DATA
  fnLoadMarca(){
    this.spinner.show();
        this.service.getSelectMarca().subscribe({
          next: (res) => {
            if(res.success){
              this.listMarca = res.data;
            }
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
  }

  fnLoadPresentacion(){
    this.spinner.show();
        this.service.getSelectPresentacion().subscribe({
          next: (res) => {
            if(res.success){
              this.listPresentacion = res.data;
            }
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
  }

  fnLoadUnidadMedida(){
    this.spinner.show();
        this.service.getSelectUnidadMedida().subscribe({
          next: (res) => {
            if(res.success){
              this.listUnidadMedida = res.data;
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
    this.fnLoadMarca();
    this.fnLoadPresentacion();
    this.fnLoadUnidadMedida();
    if(this.data.opcion == 2){
      this.nIdProducto = this.data.producto?.nIdProducto!;
      this.fcSKU.setValue(this.data.producto?.sSKU);
      this.fcDescripcion.setValue(this.data.producto?.sDescripcion);
      this.fcMarca.setValue(this.data.producto?.nIdMarca);
      this.fcPresentacion.setValue(this.data.producto?.nIdPresentacion);
      this.fcUnidadMedida.setValue(this.data.producto?.nIdUnidadMedida);
      this.fcCantidad.setValue(this.data.producto?.nUnidades);
    }
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
    this.fcSKU.markAsTouched();
    this.fcDescripcion.markAsTouched();
    this.fcMarca.markAsTouched();
    this.fcPresentacion.markAsTouched();
    this.fcUnidadMedida.markAsTouched();
    this.fcCantidad.markAsTouched();

    if(this.isInvalidFc(this.fcSKU)) return false;
    if(this.isInvalidFc(this.fcDescripcion)) return false;
    if(this.isInvalidFc(this.fcMarca)) return false;
    if(this.isInvalidFc(this.fcPresentacion)) return false;
    if(this.isInvalidFc(this.fcUnidadMedida)) return false;
    if(this.isInvalidFc(this.fcCantidad)) return false;

    return true;
  }
  
  fnGuardar(){
    if(this.isValidForm()){
      var producto : ProductoDTO = { 
        sSKU : this.fcSKU.value,
        sDescripcion : this.fcDescripcion.value,
        nIdMarca : this.fcMarca.value,
        nIdPresentacion : this.fcPresentacion.value,
        nIdUnidadMedida : this.fcUnidadMedida.value,
        nUnidades : this.fcCantidad.value,
      }

      if(this.data.opcion == 1){
        this.spinner.show();
        this.service.postInsProducto(producto).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      } else if(this.data.opcion == 2){
        producto.nIdProducto = this.data.producto?.nIdProducto!;
        this.spinner.show();
        this.service.postUpdProducto(producto).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      }
    }
  }
  
  fnMostrarRespuesta(res : ApiResponse<SqlRspDTO>){
    this.exito = res.success;
    Swal.fire({
      icon: res.success ? 'success' : 'error',
      text: res.data.sMsj,
    });
    if(this.exito){
      this.onClose();
    }
  }
  //#endregion
}
