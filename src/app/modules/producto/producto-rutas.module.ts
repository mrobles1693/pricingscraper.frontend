import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from 'src/app/shared/components/container/container.component';

import { ProductoComponent } from './producto/producto.component';

import { MarcaComponent } from './marca/marca.component';
import { FormMarcaComponent } from './marca/dialogs/form-marca/form-marca.component';

import { PresentacionComponent } from './presentacion/presentacion.component';
import { FormPresentacionComponent } from './presentacion/dialogs/form-presentacion/form-presentacion.component';

import { CategoriaComponent } from './categoria/categoria.component';
import { FormCategoriaComponent } from './categoria/dialogs/form-categoria/form-categoria.component';

import { UnidadMedidaComponent } from './unidad-medida/unidad-medida.component';
import { FormUnidadMedidaComponent } from './unidad-medida/dialogs/form-unidad-medida/form-unidad-medida.component';

import { ComercioComponent } from './comercio/comercio.component';
import { FormComercioComponent } from './comercio/dialogs/form-comercio/form-comercio.component';

import { BotExecutionComponent } from './bot-execution/bot-execution.component';

export const PRODUCTO_RUTAS_COMPONENTES = [
    ProductoComponent,
    MarcaComponent,
    FormMarcaComponent,
    PresentacionComponent,
    FormPresentacionComponent,
    CategoriaComponent,
    FormCategoriaComponent,
    UnidadMedidaComponent,
    FormUnidadMedidaComponent,
    ComercioComponent,
    FormComercioComponent,
    BotExecutionComponent
]

const routes : Routes = [
    {
        path : "producto",
        component : ContainerComponent,
        children: 
        [
            {
                path: "producto",
                component : ProductoComponent,
            },
            {
                path: "marca",
                component: MarcaComponent,
            },
            {
                path: "presentacion",
                component: PresentacionComponent,
            },
            {
                path: "categoria",
                component: CategoriaComponent,
            },
            {
                path: "unidad-medida",
                component: UnidadMedidaComponent,
            },
            {
                path: "comercio",
                component: ComercioComponent,
            },
            {
                path: "bot-execution",
                component: BotExecutionComponent,
            }
        ]
    },
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    declarations : [],
})

export class ProductoRutasModule {}