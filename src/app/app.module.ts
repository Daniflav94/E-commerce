import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CarroselComponent,
    DestaquesComponent,
    ProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxGlideModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
