import { Host, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BlankLayoutComponent } from './shared/components/layouts/blank-layout/blank-layout.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: BlankLayoutComponent,
    children: [
      {
        path:'',
        loadChildren: () => import('./pages/main/main.module').then(m=>m.MainModule)
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
