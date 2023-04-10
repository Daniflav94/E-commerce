import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { SacolaService } from 'src/app/services/sacola.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private _sacolaService: SacolaService
  ){}

  ngOnInit(): void {
    this.inicializarProduto()
  }

  produto: Produto =
  {
    id: 2,
    name: "POP KEYS",
    resumo: "Teclado mecânico sem fio com teclas emoji personalizáveis",
    description: "Deixe a personalidade estourar na sua mesa e além com POP Keys. Junto com um mouse POP correspondente, deixe seu verdadeiro eu brilhar com uma estética de mesa impressionante e teclas de emoji personalizáveis e divertidas.",
    price: 764.90,
    picture_url: "assets/img/pop-keys-gallery-daydream-1.webp", 
    category: "Teclados"
  }

    foto: string = this.produto.picture_url[0]
    picture_url: string[] = []
    quantidadeProduto: number =  1

    inicializarProduto():void {
      const idProduto = this.route.snapshot.params["id"]
      this.produtoService.buscarPorId(idProduto).subscribe(produto => {
        this.produto = produto
        this.adicionarFotosProduto()
      })
    }

    adicionarFotosProduto(){
      const nomeProduto = (this.produto.name).toLowerCase()
      for (let index = 1; index <= 4; index++) {
        const caminhoFoto = `assets/img/${nomeProduto}-${index}.png`
          this.picture_url.push(caminhoFoto)
        }
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

    adicionarProduto() {
      this._sacolaService.adicionarProduto(this.produto, this.quantidadeProduto)
    }


}
