import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { ProductoDTO } from 'src/app/shared/interfaces/ProductoDTO';
import { SimilarService } from '../../similar.service';
import { SimilarDTO } from 'src/app/shared/interfaces/SimilarDTO';
import { FormSimilarComponent } from '../../dialogs/form-similar/form-similar.component';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent {
  _nIdProducto : number = 0;

  @Input() set nIdProducto(nIdProducto : number | undefined | null){ 
    if(nIdProducto !== null &&  nIdProducto !== undefined){
      this._nIdProducto = nIdProducto;
      this.fnLoadListSimilar();
    } else {
      this._nIdProducto = 0;
      this.dsSimilar = new MatTableDataSource();
      this.dsSimilar.paginator = this.pagSimilar;

      this.dsSimilarSelect = new MatTableDataSource();
      this.dsSimilarSelect.paginator = this.pagSimilarSelect;
    }
  }

  dsSimilar = new MatTableDataSource<SimilarDTO>();
  dcSimilar = ['nIdSimilar', 'sComercio', 'sSKU', 'sDescripcion', 'nPrecio', 'sUrl', 'bManual', 'sUsuario_crea', 'sFecha_crea', 'Opciones'];
  @ViewChild('pagSimilar', {static: false}) pagSimilar! : MatPaginator;

  dsSimilarSelect = new MatTableDataSource<SimilarDTO>();
  dcSimilarSelect = ['nIdSimilar', 'sComercio', 'sSKU', 'sDescripcion', 'nPrecio', 'sUrl', 'bManual', 'sUsuario_crea', 'sFecha_crea', 'Opciones'];
  @ViewChild('pagSimilarSelect', {static: false}) pagSimilarSelect! : MatPaginator;

  constructor(
    private dialog : MatDialog,
    private spinner : NgxSpinnerService,
    private service : SimilarService,
    private authService : AuthService,
  ){}

  //#region LOAD DATA
  fnLoadListSimilar(){
    this.spinner.show();
    this.service.getListSimilarByProducto(this._nIdProducto).subscribe({
      next : (res) => {
        if(res.success){
          var listTemp = res.data;
          this.dsSimilarSelect = new MatTableDataSource(listTemp.filter((s) => s.bElegido));
          this.dsSimilarSelect.paginator = this.pagSimilarSelect
          
          this.dsSimilar = new MatTableDataSource(listTemp.filter((s) => !s.bElegido));
          this.dsSimilar.paginator = this.pagSimilar
        }
      }
      ,error: (err) => console.log(err)
      ,complete: () => this.spinner.hide()
    });
  }
  //#endregion

  odFormSimilar(similar? : SimilarDTO){
    const dialogResult = this.dialog.open(
      FormSimilarComponent,
      {
        width:'600px',
        maxHeight: '80vh',
        disableClose : true,
        data  : {
          opcion : similar == null ? 1 : 2,
          nIdProducto : this._nIdProducto,
          similar : similar
        }
      }
    );

    dialogResult.afterClosed().subscribe( 
      res => {
        if(res.exito){
          this.fnLoadListSimilar();
        }
      }
    );
  }
}
