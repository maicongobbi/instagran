import { AutenticacaoGuard } from './autenticacao-guard.service';
import { AcessoComponent } from "./acesso/acessoComponent";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

import { BannerComponent } from "./acesso/banner/banner.component";
import { LoginComponent } from "./acesso/login/login.component";
import { CadastroComponent } from "./acesso/cadastro/cadastro.component";
import { Autenticacao } from "./autenticacao.service";
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule //tem que importar aqui e ajeitar o polifills - para navegadores antigos
    , RouterModule.forRoot(ROUTES)
  ],
  providers: [Autenticacao, AutenticacaoGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
