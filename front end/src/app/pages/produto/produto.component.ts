import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
  ){}

  ngOnInit(): void {
    this.inicializarProduto()
  }

  produto: Produto =
  {
    id: 2,
    nome: "POP KEYS",
    resumo: "Teclado mecânico sem fio com teclas emoji personalizáveis",
    descricao: "Deixe a personalidade estourar na sua mesa e além com POP Keys. Junto com um mouse POP correspondente, deixe seu verdadeiro eu brilhar com uma estética de mesa impressionante e teclas de emoji personalizáveis e divertidas.",
    valor: 764.90,
    fotos: ["assets/img/pop-keys-gallery-daydream-1.webp", "assets/img/pop-keys-gallery-daydream-6.webp", "assets/img/pop-keys-gallery-daydream-2.webp", "assets/img/pop-keys-gallery-daydream-5.webp"],
    categoria: "Teclados"
  }

    foto: string = this.produto.fotos[0]
    quantidadeProduto: number =  1

    inicializarProduto():void {
      const idProduto = this.route.snapshot.params["id"]
      this.produtoService.buscarPorId(idProduto).subscribe(produto => {
        this.produto = produto
      })
    }

    somarQuantidade() {
      this.quantidadeProduto++
    }

    subtrairQuantidade() {
      if(this.quantidadeProduto > 1){
        this.quantidadeProduto--
      }
    }

    trocarFoto(foto: string) {
      this.foto = foto

    }


}
