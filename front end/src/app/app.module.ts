import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CarroselComponent } from './components/carrosel/carrosel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DestaquesComponent } from './components/destaques/destaques.component';
import { NgxGlideModule } from 'ngx-glide';
import { ProdutoComponent } from './pages/produto/produto.component';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { HttpClientModule } from '@angular/common/http';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { FinalizarCompraComponent } from './pages/finalizar-compra/finalizar-compra.component';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarroselComponent,
    DestaquesComponent,
    ProdutoComponent,
    CategoriasComponent,
    LancamentosComponent,
    PesquisaComponent,
    FinalizarCompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxGlideModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
