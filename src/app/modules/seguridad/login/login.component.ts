import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePass = true;
  fcUsuario = new FormControl(null, [Validators.required]);
  fcPassword = new FormControl(null, [Validators.required]);

  bError = false;
  sMsjError = '';

  constructor(
    private router : Router,
    private service : AuthService,
    private spinner : NgxSpinnerService,
  ){
    if(this.service.isLogged()){
      this.router.navigate(['/inicio']);
    }
  }

  isInvalidFc(fc : FormControl){
    return (fc.status == 'INVALID' && fc.touched) ? true : false;
  }

  getErrorFC(fc : FormControl, maxlengt? : number, msjPattern? : string, msjMin? : string,  msjMax? : string){
    return fc.hasError('required') ? 'Campo requerido' 
    : fc.hasError('maxlength') ? 'Máximo ' + maxlengt + ' caracteres.'
    : fc.hasError('pattern') ? msjPattern
    : fc.hasError('min') ? msjMin
    : fc.hasError('max') ? msjMax : '';
  }

  isValidForm(){
    this.fcUsuario.markAsTouched();
    this.fcPassword.markAsTouched();

    if(this.isInvalidFc(this.fcUsuario)) return false;
    if(this.isInvalidFc(this.fcPassword)) return false;

    return true;
  }

  login(){
    if(this.isValidForm()){
      this.spinner.show();
      this.service.login(this.fcUsuario.value!, this.fcPassword.value!).subscribe({
        next: (res) => {
          this.bError = !res.success;
          if(res.success){
            localStorage.setItem('token', res.data);
            this.router.navigate(['/inicio']);
          } else {
            this.sMsjError = res.errMsj;
          }
          this.spinner.hide();
        }
        ,error: err => {
          console.log(err);
          this.spinner.hide();
        }
      });
    }
  }  
}
