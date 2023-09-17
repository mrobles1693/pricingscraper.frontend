import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioDTO } from 'src/app/shared/interfaces/UsuarioDTO';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {
  exito = false;
  hidePass = true;

  nIdUsuario : number | null = null;
  fcUsuario = new FormControl<any>(null, [Validators.required]);
  fcActivo = new FormControl<any>(null, [Validators.required]);
  fcPassword = new FormControl<any>(null);
  
  constructor(
    public dialogRef : MatDialogRef<FormUsuarioComponent>,
    private service : UsuarioService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {opcion : number, usuario? : UsuarioDTO} 
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
    if(this.data.opcion == 1){
      this.fcPassword = new FormControl<any>(null, [Validators.required]);
      this.fcActivo.setValue(true);
      this.fcActivo.disable();
    }
    if(this.data.opcion == 2){
      this.nIdUsuario = this.data.usuario?.nIdUsuario!;
      this.fcUsuario.setValue(this.data.usuario?.sUsuario);
      this.fcActivo.setValue(this.data.usuario?.bActivo);
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
    this.fcUsuario.markAsTouched();
    this.fcActivo.markAsTouched();
    this.fcPassword.markAsTouched();

    if(this.isInvalidFc(this.fcUsuario)) return false;
    if(this.isInvalidFc(this.fcActivo)) return false;
    if(this.isInvalidFc(this.fcPassword)) return false;

    return true;
  }
  
  fnGuardar(){
    if(this.isValidForm()){
      var usuario : UsuarioDTO = { 
        sUsuario : this.fcUsuario.value,
        bActivo : this.fcActivo.value,
        sPassword : this.fcPassword.value,
      }

      if(this.data.opcion == 1){
        this.spinner.show();
        this.service.postInsUsuario(usuario).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      } else if(this.data.opcion == 2){
        usuario.nIdUsuario = this.data.usuario?.nIdUsuario!;
        this.spinner.show();
        this.service.postUpdUsuario(usuario).subscribe({
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
