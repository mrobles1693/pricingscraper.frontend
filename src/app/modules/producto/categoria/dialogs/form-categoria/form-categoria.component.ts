import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from '../../categoria.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaDTO } from 'src/app/shared/interfaces/CategoriaDTO';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent {
  exito = false;

  nIdCategoria : number | null = null;
  fcCategoria = new FormControl<any>(null, [Validators.required]);
  fcDescripcion = new FormControl<any>(null);
  
  constructor(
    public dialogRef : MatDialogRef<FormCategoriaComponent>,
    private service : CategoriaService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {opcion : number, categoria? : CategoriaDTO} 
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

  //#region EVENTOS FORMULARIO
  fnIniciarForm(){
    if(this.data.opcion == 2){
      this.nIdCategoria = this.data.categoria?.nIdCategoria!;
      this.fcCategoria.setValue(this.data.categoria?.sCategoria);
      this.fcDescripcion.setValue(this.data.categoria?.sDescripcion);
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
    this.fcCategoria.markAsTouched();
    this.fcDescripcion.markAsTouched();

    if(this.isInvalidFc(this.fcCategoria)) return false;
    if(this.isInvalidFc(this.fcDescripcion)) return false;

    return true;
  }
  
  fnGuardar(){
    if(this.isValidForm()){
      var categoria : CategoriaDTO = { 
        sCategoria : this.fcCategoria.value,
        sDescripcion : this.fcDescripcion.value,
      }

      if(this.data.opcion == 1){
        this.spinner.show();
        this.service.postInsCategoria(categoria).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      } else if(this.data.opcion == 2){
        categoria.nIdCategoria = this.data.categoria?.nIdCategoria!;
        this.spinner.show();
        this.service.postUpdCategoria(categoria).subscribe({
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
