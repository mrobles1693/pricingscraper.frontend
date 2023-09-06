import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from 'src/app/shared/components/container/container.component';

import { ProductoComponent } from './producto/producto.component';

export const PRODUCTO_RUTAS_COMPONENTES = [
    ProductoComponent,
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