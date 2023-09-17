import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from 'src/app/shared/components/container/container.component';

import { ProductoComponent } from './producto/producto.component';

import { MarcaComponent } from './marca/marca.component';
import { FormMarcaComponent } from './marca/dialogs/form-marca/form-marca.component';

import { PresentacionComponent } from './presentacion/presentacion.component';
import { FormPresentacionComponent } from './presentacion/dialogs/form-presentacion/form-presentacion.component';

export const PRODUCTO_RUTAS_COMPONENTES = [
    ProductoComponent,
    MarcaComponent,
    FormMarcaComponent,
    PresentacionComponent,
    FormPresentacionComponent
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