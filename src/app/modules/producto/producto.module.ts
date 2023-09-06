import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material/material.module';

import { ProductoRutasModule, PRODUCTO_RUTAS_COMPONENTES } from './producto-rutas.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductoRutasModule
  ],
  declarations: [PRODUCTO_RUTAS_COMPONENTES]
})
export class ProductoModule { }
