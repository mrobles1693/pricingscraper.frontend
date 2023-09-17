import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarcaService } from '../../marca.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarcaDTO } from 'src/app/shared/interfaces/MarcaDTO';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.component.html',
  styleUrls: ['./form-marca.component.css']
})
export class FormMarcaComponent {
  exito = false;

  nIdMarca : number | null = null;
  fcMarca = new FormControl<any>(null, [Validators.required]);
  fcDescripcion = new FormControl<any>(null);
  
  constructor(
    public dialogRef : MatDialogRef<FormMarcaComponent>,
    private service : MarcaService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {opcion : number, marca? : MarcaDTO} 
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
      this.nIdMarca = this.data.marca?.nIdMarca!;
      this.fcMarca.setValue(this.data.marca?.sMarca);
      this.fcDescripcion.setValue(this.data.marca?.sDescripcion);
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
    this.fcMarca.markAsTouched();
    this.fcDescripcion.markAsTouched();

    if(this.isInvalidFc(this.fcMarca)) return false;
    if(this.isInvalidFc(this.fcDescripcion)) return false;

    return true;
  }
  
  fnGuardar(){
    if(this.isValidForm()){
      var marca : MarcaDTO = { 
        sMarca : this.fcMarca.value,
        sDescripcion : this.fcDescripcion.value,
      }

      if(this.data.opcion == 1){
        this.spinner.show();
        this.service.postInsMarca(marca).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      } else if(this.data.opcion == 2){
        marca.nIdMarca = this.data.marca?.nIdMarca!;
        this.spinner.show();
        this.service.postUpdMarca(marca).subscribe({
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
