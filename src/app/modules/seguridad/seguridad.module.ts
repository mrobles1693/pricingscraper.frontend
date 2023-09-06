import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/shared/material/material.module';

import { SeguridadRutasModule, SEGURIDAD_RUTAS_COMPONENTES } from './seguridad-rutas.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SeguridadRutasModule
  ],
  declarations: [SEGURIDAD_RUTAS_COMPONENTES]
})
export class SeguridadModule { }
