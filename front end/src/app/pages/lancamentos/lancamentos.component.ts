import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { SacolaService } from 'src/app/services/sacola.service';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent implements OnInit{

  constructor(
    private produtoService: ProdutoService,
    private _sacolaService: SacolaService
  ){}

  ngOnInit(): void {
    //this.listarProdutos()
  }

  lancamentos: Produto[] = []


  adicionarProduto(produto: Produto, quantidade: number) {
    this._sacolaService.adicionarProduto(produto, quantidade)
  }

  /* listarProdutos():void {
    this.produtoService.listarNovidades().subscribe(lista => {
      this.lancamentos  = lista
    })
  } */

}
