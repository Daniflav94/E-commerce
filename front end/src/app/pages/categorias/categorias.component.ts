import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.inicializarCategoria()
  }

  produtos: Produto[] = [];

  inicializarCategoria(): void {
    const categoria = this.route.snapshot.params['categoria'];
    console.log(categoria);
    if (categoria === 'teclados') {
      this.produtoService.listarPorCategoria(1).subscribe((lista) => {
        this.produtos = lista.products;
      });
    } else if (categoria === 'mouses') {
      this.produtoService.listarPorCategoria(2).subscribe((lista) => {
        this.produtos = lista.products;
      });
    } else if (categoria === 'webcams') {
      this.produtoService.listarPorCategoria(3).subscribe((lista) => {
        this.produtos = lista.products;
      });
    } else if (categoria === 'audio') {
      this.produtoService.listarPorCategoria(4).subscribe((lista) => {
        this.produtos = lista.products;
      });
    }
  }
}
