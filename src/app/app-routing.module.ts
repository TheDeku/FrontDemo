import { Host, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';

import { FullscreenLayoutComponent } from './shared/components/layouts/fullscreen-layout/fullscreen-layout.component'
import { NavBarLayoutComponent } from './shared/components/layouts/navbar-layout/navbar-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: NavBarLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: 'admin',
    component: NavBarLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: '',
        component: FullscreenLayoutComponent,
        loadChildren: () => import('./pages/fullscreen/fullscreen.module').then(m => m.FullscreenModule)
      }
    ]
  },
  {
    path: 'fullscreen',
    component: FullscreenLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/fullscreen/fullscreen.module').then(m => m.FullscreenModule)
      }
    ]
  },
  {
    path: 'vendor',
    component: NavBarLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/vendor/vendor.module').then(m => m.VendorModule)
      }
    ]
  }, 
  {
    path: 'warehouse',
    component: NavBarLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/warehouse/warehouse.module').then(m => m.WarehouseModule)
      }
    ]
  },  
  {
    path: 'kitchen',
    component: NavBarLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/fullscreen/fullscreen.module').then(m => m.FullscreenModule)
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/others/others.module').then(m => m.OthersModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
