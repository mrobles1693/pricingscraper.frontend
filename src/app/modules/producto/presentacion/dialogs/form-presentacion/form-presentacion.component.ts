import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PresentacionService } from '../../presentacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PresentacionDTO } from 'src/app/shared/interfaces/PresentacionDTO';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-presentacion',
  templateUrl: './form-presentacion.component.html',
  styleUrls: ['./form-presentacion.component.css']
})
export class FormPresentacionComponent {
  exito = false;

  nIdPresentacion : number | null = null;
  fcPresentacion = new FormControl<any>(null, [Validators.required]);
  fcDescripcion = new FormControl<any>(null);
  
  constructor(
    public dialogRef : MatDialogRef<FormPresentacionComponent>,
    private service : PresentacionService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {opcion : number, presentacion? : PresentacionDTO} 
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
      this.nIdPresentacion = this.data.presentacion?.nIdPresentacion!;
      this.fcPresentacion.setValue(this.data.presentacion?.sPresentacion);
      this.fcDescripcion.setValue(this.data.presentacion?.sDescripcion);
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
    this.fcPresentacion.markAsTouched();
    this.fcDescripcion.markAsTouched();

    if(this.isInvalidFc(this.fcPresentacion)) return false;
    if(this.isInvalidFc(this.fcDescripcion)) return false;

    return true;
  }
  
  fnGuardar(){
    if(this.isValidForm()){
      var presentacion : PresentacionDTO = { 
        sPresentacion : this.fcPresentacion.value,
        sDescripcion : this.fcDescripcion.value,
      }

      if(this.data.opcion == 1){
        this.spinner.show();
        this.service.postInsPresentacion(presentacion).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      } else if(this.data.opcion == 2){
        presentacion.nIdPresentacion = this.data.presentacion?.nIdPresentacion!;
        this.spinner.show();
        this.service.postUpdPresentacion(presentacion).subscribe({
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
