import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { FinalizarCompraComponent } from './pages/finalizar-compra/finalizar-compra.component';
import { HomeComponent } from './pages/home/home.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { CriarProdutoComponent } from './pages/adm/criar-produto/criar-produto.component';

const rotas: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'produto/:id',
    component: ProdutoComponent
  },
  {
    path: 'categorias/:categoria',
    component: CategoriasComponent
  },
  {
    path: 'lancamentos',
    component: LancamentosComponent
  },
  {
    path: 'pesquisa/:pesquisa',
    component: PesquisaComponent
  },
  {
    path: 'finalizarCompra',
    component: FinalizarCompraComponent
  },
  {
    path: 'adm/criar-produto',
    component: CriarProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
