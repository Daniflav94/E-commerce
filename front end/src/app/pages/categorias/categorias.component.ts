import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ){}

  ngOnInit(): void {
    this.inicializarCategoria()
  }

  lista: Produto[] = []

  inicializarCategoria():void {
    const categoria  = this.route.snapshot.params["categoria"]
    console.log(categoria)
    this.produtoService.listarPorCategoria(categoria).subscribe(lista => {
      this.lista = lista
    })
  }

}
