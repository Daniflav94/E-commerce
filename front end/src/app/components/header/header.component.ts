import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { Produtos } from 'src/app/interfaces/produtos';
import { Sacola } from 'src/app/interfaces/sacola';
import { ProdutoService } from 'src/app/services/produto.service';
import { SacolaService } from 'src/app/services/sacola.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  ngOnInit(): void {

  }

  produtosSacola: Sacola = {
    produtos: [],
    valorTotal: 0
  }

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private _sacolaService: SacolaService
  ){
    this._sacolaService.sacolaObs$.subscribe((resposta: Sacola) => {
      this.produtosSacola = resposta
      console.log(resposta)
    })
  }

  pesquisa: boolean = false
  showFiller = false;
  valorTotal: string = ""
  produtosPesquisa: Produto[] = []
  nomePesquisa: string = ""

  atualizarSacola(id: number, quantidade: number): void {
    this._sacolaService.atualizarSacola(id, quantidade)
  }


  somarQuantidade(produto: Produtos) {
    produto.quantidade++
    this.atualizarSacola(produto.produto.id, produto.quantidade)

  }

  subtrairQuantidade(produto: Produtos) {
    if(produto.quantidade > 0){
      produto.quantidade--
      this.atualizarSacola(produto.produto.id, produto.quantidade)

    }
  }

  removerProduto(id: number) {
    this._sacolaService.removerProdutos(id)
  }

  atualizar(categoria: string){
    this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/categorias/' + categoria]);
  });
  }

  pesquisar(busca: string) {
    this.pesquisa = true
    console.log("evento chamado")
    this.produtoService.buscarPorNome(busca).subscribe(lista => {
      this.produtosPesquisa = lista
    })
  }

  desabilitarPesquisa() {
    this.pesquisa = false
    this.nomePesquisa = ''
  }

  criarCategoria(){
    const categoria = {
      category: "Mouses",
      description: "Mouses para computadores"
    }
    this.produtoService.criarCategoria(categoria).subscribe(resposta => {
      console.log(resposta)
    })
  }
}
