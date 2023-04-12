import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutoAPI } from 'src/app/interfaces/produto-api';
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
    id: 0,
    name: "",
    resume: "",
    description: "",
    price: 0,
    picture_url: "",
    category: ""
  }

    foto: string = ''
    picture_url: string[] = []
    quantidadeProduto: number =  1

    inicializarProduto():void {
      const idProduto = this.route.snapshot.params["id"]
      this.produtoService.buscarPorId(idProduto).subscribe(produto => {
        this.produto = produto.products
        this.foto = produto.products.picture_url

        const nomeProduto = (this.produto.name).toLowerCase()
        for (let index = 2; index <= 3; index++) {
        const caminhoFoto = `assets/img/${nomeProduto}-${index}.png`
          this.picture_url.push(caminhoFoto)

        }
        console.log(this.picture_url)
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

    adicionarProduto() {
      this._sacolaService.adicionarProduto(this.produto, this.quantidadeProduto)
    }


}
