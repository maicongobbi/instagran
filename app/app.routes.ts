import { AutenticacaoGuard } from './autenticacao-guard.service';
import { AcessoComponent } from './acesso/acessoComponent';
import { Routes } from '@angular/router'


import { HomeComponent } from './home/home.component'

export const ROUTES: Routes = [
    { path: '', component: AcessoComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AutenticacaoGuard]
  },
]
