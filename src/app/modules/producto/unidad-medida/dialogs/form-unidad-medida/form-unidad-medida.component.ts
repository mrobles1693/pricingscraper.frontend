import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnidadMedidaService } from '../../unidad-medida.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnidadMedidaDTO } from 'src/app/shared/interfaces/UnidadMedidaDTO';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-unidad-medida',
  templateUrl: './form-unidad-medida.component.html',
  styleUrls: ['./form-unidad-medida.component.css']
})
export class FormUnidadMedidaComponent {
  exito = false;

  nIdUnidadMedida : number | null = null;
  fcUnidadMedida = new FormControl<any>(null, [Validators.required]);
  fcSimbolo = new FormControl<any>(null);
  fcDescripcion = new FormControl<any>(null);
  
  constructor(
    public dialogRef : MatDialogRef<FormUnidadMedidaComponent>,
    private service : UnidadMedidaService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {opcion : number, unidadMedida? : UnidadMedidaDTO} 
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
      this.nIdUnidadMedida = this.data.unidadMedida?.nIdUnidadMedida!;
      this.fcUnidadMedida.setValue(this.data.unidadMedida?.sUnidadMedida);
      this.fcSimbolo.setValue(this.data.unidadMedida?.sSimbolo);
      this.fcDescripcion.setValue(this.data.unidadMedida?.sDescripcion);
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
    this.fcUnidadMedida.markAsTouched();
    this.fcSimbolo.markAsTouched();
    this.fcDescripcion.markAsTouched();

    if(this.isInvalidFc(this.fcUnidadMedida)) return false;
    if(this.isInvalidFc(this.fcSimbolo)) return false;
    if(this.isInvalidFc(this.fcDescripcion)) return false;

    return true;
  }
  
  fnGuardar(){
    if(this.isValidForm()){
      var unidadMedida : UnidadMedidaDTO = { 
        sUnidadMedida : this.fcUnidadMedida.value,
        sSimbolo : this.fcSimbolo.value,
        sDescripcion : this.fcDescripcion.value,
      }

      if(this.data.opcion == 1){
        this.spinner.show();
        this.service.postInsUnidadMedida(unidadMedida).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      } else if(this.data.opcion == 2){
        unidadMedida.nIdUnidadMedida = this.data.unidadMedida?.nIdUnidadMedida!;
        this.spinner.show();
        this.service.postUpdUnidadMedida(unidadMedida).subscribe({
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
