import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { SacolaService } from 'src/app/services/sacola.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit{

  ngOnInit(): void {
    this.pesquisa()
  }

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private _sacolaService: SacolaService
  ){}

  @Input() produtosPesquisa: Produto[] = []
  @Input() nomePesquisa: string = ""

  pesquisa(){
    const busca  = this.route.snapshot.params["pesquisa"]
    console.log(busca)
    if(busca){
      this.nomePesquisa = busca
      this.produtoService.buscarPorNome(busca).subscribe(lista => {
        this.produtosPesquisa = lista.products
        console.log(this.produtosPesquisa)
      })
    }

  }

  adicionarProduto(produto: Produto, quantidade: number) {
    this._sacolaService.adicionarProduto(produto, quantidade)
  }
}
