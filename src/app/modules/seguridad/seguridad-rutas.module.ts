import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from 'src/app/shared/components/container/container.component';

import { LoginComponent } from './login/login.component';

import { UsuarioComponent } from './usuario/usuario.component';


export const SEGURIDAD_RUTAS_COMPONENTES = [
    LoginComponent,
    UsuarioComponent,
]

const routes : Routes = [
    {
        path : "",
        component : LoginComponent,
        children: []
    },
    {
        path : "login",
        component : LoginComponent,
        children: []
    },
    // { 
    //     path: '**',
    //     pathMatch: 'full',
    //     redirectTo: '/inicio'
    // },
    {
        path : "inicio",
        component : ContainerComponent,
        children: []
    },
    {
        path : "seguridad",
        component : ContainerComponent,
        children: 
        [
    //         {
    //             path : "perfil",
    //             component : PerfilComponent,
    //         },
    //         {
    //             path : "opcion",
    //             component : OpcionComponent,
    //         },
            {
                path: "usuario",
                component : UsuarioComponent,
            }
        ]
    },
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    declarations : [],
})

export class SeguridadRutasModule {}