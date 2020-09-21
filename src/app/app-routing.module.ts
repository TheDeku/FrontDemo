import { Host, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './pages/home/home.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
