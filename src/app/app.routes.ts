import { Routes } from '@angular/router';

import { Categories } from './features/categories/categories';
import { Dashboard } from './features/dashboard/dashboard';
import { Fournisseurs } from './features/fournisseurs/fournisseurs';
import { Produits } from './features/produits/produits';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Stock } from './features/stock/stock';
import { Login } from './features/login/login';

import { authGuard } from './core/guards/auth-guard';
import { MouvementStock } from './features/mouvement-stock/mouvement-stock';
import { Lot } from './features/lot/lot';


export const routes: Routes = [

    {
        path: 'login',
        component: Login
    },


    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],

        children: [

            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },

            {
                path: 'dashboard',
                component: Dashboard
            },

            {
                path: 'produits',
                component: Produits
            },

            {
                path: 'categories',
                component: Categories
            },

            {
                path: 'fournisseurs',
                component: Fournisseurs
            },

            {
                path: 'stock',
                component: Stock
            },
            {
                path: 'mouvements',
                component: MouvementStock
            },
            {
                path: 'lots',
                component: Lot
            }

        ]
    },


    {
        path: '**',
        redirectTo: ''
    }

];