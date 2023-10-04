import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectDTO } from 'src/app/shared/interfaces/SelectDTO';
import { SimilarDTO } from 'src/app/shared/interfaces/SimilarDTO';
import { SimilarService } from '../../similar.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-form-similar',
  templateUrl: './form-similar.component.html',
  styleUrls: ['./form-similar.component.css']
})
export class FormSimilarComponent {
  exito = false;

  listComercio : SelectDTO[] = [];

  nIdSimilar : number | null = null;
  fcComercio = new FormControl<any>(null, [Validators.required]);
  fcSKU = new FormControl<any>(null, [Validators.required]);
  fcDescripcion = new FormControl<any>(null, [Validators.required]);
  fcPrecio = new FormControl<any>(null, [Validators.required]);
  fcUrl = new FormControl<any>(null, [Validators.required]);
  fcElegido = new FormControl<any>(null, [Validators.required]);
  
  constructor(
    public dialogRef : MatDialogRef<FormSimilarComponent>,
    private service : SimilarService,
    private authService : AuthService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data : {opcion : number, nIdProducto : number, similar? : SimilarDTO} 
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
  fnLoadComercio(){
    this.spinner.show();
        this.service.getSelectComercio().subscribe({
          next: (res) => {
            if(res.success){
              this.listComercio = res.data;
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
    this.fnLoadComercio();
    if(this.data.opcion == 1){
      this.fcElegido.setValue(true);
      this.fcElegido.disable();
    }
    if(this.data.opcion == 2){
      this.nIdSimilar = this.data.similar?.nIdSimilar!;
      this.fcComercio.setValue(this.data.similar?.nIdComercio);
      this.fcSKU.setValue(this.data.similar?.sSKU);
      this.fcDescripcion.setValue(this.data.similar?.sDescripcion);
      this.fcPrecio.setValue(this.data.similar?.nPrecio);
      this.fcUrl.setValue(this.data.similar?.sUrl);
      this.fcElegido.setValue(this.data.similar?.bElegido);
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
    this.fcSKU.markAsTouched();
    this.fcDescripcion.markAsTouched();
    this.fcPrecio.markAsTouched();
    this.fcUrl.markAsTouched();
    this.fcElegido.markAsTouched();

    if(this.isInvalidFc(this.fcComercio)) return false;
    if(this.isInvalidFc(this.fcSKU)) return false;
    if(this.isInvalidFc(this.fcDescripcion)) return false;
    if(this.isInvalidFc(this.fcPrecio)) return false;
    if(this.isInvalidFc(this.fcUrl)) return false;
    if(this.isInvalidFc(this.fcElegido)) return false;

    return true;
  }
  
  fnGuardar(){
    if(this.isValidForm()){
      var similar : SimilarDTO = { 
        nIdProducto : this.data.nIdProducto,
        nIdComercio : this.fcComercio.value,
        sSKU : this.fcSKU.value,
        sDescripcion : this.fcDescripcion.value,
        nPrecio : this.fcPrecio.value,
        sUrl : this.fcUrl.value,
        bElegido : this.fcElegido.value,
        bManual : true,
        nIdUsuario_crea : this.authService.getUserId()
      }

      if(this.data.opcion == 1){
        this.spinner.show();
        this.service.postInsSimilar(similar).subscribe({
          next: (res : ApiResponse<SqlRspDTO>) => {
            this.fnMostrarRespuesta(res);
          },
          error: (err) => {
            console.log(err)
          },
          complete: () => this.spinner.hide()
        });
      } else if(this.data.opcion == 2){
        similar.nIdSimilar = this.data.similar?.nIdSimilar!;
        this.spinner.show();
        this.service.postUpdSimilar(similar).subscribe({
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
