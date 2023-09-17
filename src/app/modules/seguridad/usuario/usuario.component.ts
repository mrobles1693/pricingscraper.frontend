import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioDTO } from 'src/app/shared/interfaces/UsuarioDTO';
import { UsuarioService } from './usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FormUsuarioComponent } from './dialogs/form-usuario/form-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  fcFiltro = new FormControl(null);

  dsUsuarios = new MatTableDataSource<UsuarioDTO>();
  dcUsuarios = ['nIdUsuario', 'sUsuario', 'bActivo', 'Opciones'];
  @ViewChild('pagUsuarios', {static: false}) pagUsuarios! : MatPaginator;

  constructor(
    private service : UsuarioService,
    private spinner : NgxSpinnerService,
    private dialog : MatDialog,
  ){
    this.fnLoadUsuarios();
  }

  fnLoadUsuarios(){
    this.spinner.show();
    this.service.getListUsuario().subscribe({
      next : (res) => {
        if(res.success){
          this.dsUsuarios = new MatTableDataSource(res.data);
          this.dsUsuarios.paginator = this.pagUsuarios
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }

  filtrarUsuarios(){
    this.dsUsuarios.filter = this.fcFiltro.value!;
  }

  odFormUsuario(usuario? : UsuarioDTO){
    const dialogResult = this.dialog.open(
      FormUsuarioComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          opcion : usuario == null ? 1 : 2,
          usuario : usuario
        }
      }
    );

    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnLoadUsuarios();
        }
      }
    );
  }
}
