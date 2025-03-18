import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'marque',
        loadComponent: () => import('./demo/marque-voiture/marque-voiture.component').then(m => m.MarqueVoitureComponent)
      },
      {
        path: 'fournisseur',
        loadComponent: () => import('./demo/fournisseur/fournisseur.component').then(m => m.FournisseurComponent)
      },
      {
        path: 'piece',
        loadComponent: () => import('./demo/piece/piece.component').then(m => m.PieceComponent)
      },

      {
        path: 'annee',
        loadComponent: () => import('./demo/annee-voiture/annee-voiture.component').then(m => m.AnneeVoitureComponent)
      }

    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }

    ]
  },
  {
    path: '',
    children: [
      {
        path: 'love',
        loadComponent: () => import('./demo/test/test.component').then(m => m.TestComponent)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
