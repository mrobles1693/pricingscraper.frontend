import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComercioService } from '../../comercio.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComercioDTO } from 'src/app/shared/interfaces/ComercioDTO';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-comercio',
  templateUrl: './form-comercio.component.html',
  styleUrls: ['./form-comercio.component.css']
})
export class FormComercioComponent {
  exito = false;

  nIdComercio : number | null = null;
  fcComercio = new FormControl<any>(null, [Validators.required]);
  fcUrl = new FormControl<any>(null, [Validators.required]);
  fcDescripcion = new FormControl<any>(null);
  
  constructor(
    public dialogRef : MatDialogRef<FormComercioComponent>,
    private service : ComercioService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {opcion : number, comercio? : ComercioDTO} 
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
      this.nIdComercio = this.data.comercio?.nIdComercio!;
      this.fcComercio.setValue(this.data.comercio?.sComercio);
      this.fcUrl.setValue(this.data.comercio?.sUrl);
      this.fcDescripcion.setValue(this.data.comercio?.sDescripcion);
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
    this.fcComercio.markAsTouched();
    this.fcUrl.markAsTouched();
    this.fcDescripcion.markAsTouched();

    if(this.isInvalidFc(this.fcComercio)) return false;
    if(this.isInvalidFc(this.fcUrl)) return false;
    if(this.isInvalidFc(this.fcDescripcion)) return false;

    return true;
  }
  
  fnGuardar(){
    if(this.isValidForm()){
      var comercio : ComercioDTO = { 
        sComercio : this.fcComercio.value,
        sUrl : this.fcUrl.value,
        sDescripcion : this.fcDescripcion.value,
      }

      if(this.data.opcion == 1){
        this.spinner.show();
        this.service.postInsComercio(comercio).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      } else if(this.data.opcion == 2){
        comercio.nIdComercio = this.data.comercio?.nIdComercio!;
        this.spinner.show();
        this.service.postUpdComercio(comercio).subscribe({
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
