import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from 'src/app/shared/components/container/container.component';

import { ProductoComponent } from './producto/producto.component';
import { DetailsProductoComponent } from './producto/sub-views/details-producto/details-producto.component';
import { SimilarComponent } from './producto/sub-views/similar/similar.component';
import { FormProductoComponent } from './producto/dialogs/form-producto/form-producto.component';
import { FormSimilarComponent } from './producto/dialogs/form-similar/form-similar.component';
import { FormProductoCategoriaComponent } from './producto/dialogs/form-producto-categoria/form-producto-categoria.component';

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
import { DetailsBotExecutionComponent } from './bot-execution/sub-views/details-bot-execution/details-bot-execution.component';

export const PRODUCTO_RUTAS_COMPONENTES = [
    ProductoComponent,
    DetailsProductoComponent,
    SimilarComponent,
    FormProductoComponent,
    FormSimilarComponent,
    FormProductoCategoriaComponent,
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
    BotExecutionComponent,
    DetailsBotExecutionComponent
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
                path : "producto/edit/:idProducto",
                component : DetailsProductoComponent,
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
            },
            {
                path : "bot-execution/details/:idBotExecution",
                component : DetailsBotExecutionComponent,
            },
        ]
    },
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    declarations : [],
})

export class ProductoRutasModule {}