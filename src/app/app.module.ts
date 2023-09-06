import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, ROUTING_COMPONENTS } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { ContainerComponent } from './shared/components/container/container.component';

import { SeguridadModule } from './modules/seguridad/seguridad.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductoModule } from './modules/producto/producto.module';

@NgModule({
  declarations: [ AppComponent, ROUTING_COMPONENTS, ContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
    SeguridadModule,
    ProductoModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, 
      useValue: 'es-PE'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
