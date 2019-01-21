import { AcessoComponent } from './acesso/acessoComponent';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,

    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, //tem que importar aqui e ajeitar o polifills - para navegadores antigos

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
