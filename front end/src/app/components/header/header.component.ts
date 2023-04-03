import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { Produtos } from 'src/app/interfaces/produtos';
import { Sacola } from 'src/app/interfaces/sacola';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  ngOnInit(): void {
    this.calcularTotal()
  }

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ){}

  pesquisa: boolean = false
  showFiller = false;
  valorTotal: string = ""
  produtosPesquisa: Produto[] = []
  nomePesquisa: string = ""

  produtosSacola: Sacola = {
    id: 1,
    valorTotal: 0,
    produtos:
      [{
        produto: {
          id: 1,
          nome: "Teclado sem fio Logitech K480",
          resumo: "Suporte Integrado para Smartphone e Tablet, Conexão Bluetooth Easy-Switch para até 3 dispositivos e Pilha Inclusa",
          descricao: "O K480 é um teclado sem fio com conexão Bluetooth e Multi-Device exclusivo para o seu computador ... que também funciona com o seu tablet e smartphone. O Easy-Switch permite que você alterne a digitação facilmente entre 3 dispositivos sem fio Bluetooth conectados e a base integrada mantém seu telefone ou tablet no ângulo certo para você ler enquanto digita. Você encontrará um layout de teclado familiar com todas as teclas de atalho que você mais usa, quer esteja digitando em um computador Windows, Mac ou Chrome, ou em um tablet ou smartphone Android ou iOS.",
          valor: 305.90,
          fotos: ["assets/img/k380-multi-device-bluetooth-keyboard-_1__2.png"],
          categoria: "Teclados"
        },
        quantidade: 1
      },
      {
        produto: {
          id: 2,
          nome: "POP KEYS",
          resumo: "Teclado mecânico sem fio com teclas emoji personalizáveis",
          descricao: "Deixe a personalidade estourar na sua mesa e além com POP Keys. Junto com um mouse POP correspondente, deixe seu verdadeiro eu brilhar com uma estética de mesa impressionante e teclas de emoji personalizáveis e divertidas.",
          valor: 764.90,
          fotos: ["assets/img/pop-keys-gallery-daydream-1.webp", "assets/img/pop-keys-gallery-daydream-6.webp", "assets/img/pop-keys-gallery-daydream-2.webp"],
          categoria: "Teclados"
        },
        quantidade: 2,
      }]

  }

  calcularTotal() {
    let total: number = 0
    this.produtosSacola.produtos.forEach(produto => {
      total += (produto.produto.valor * produto.quantidade)
      this.produtosSacola.valorTotal = total
    this.valorTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) as string
    })
  }

  somarQuantidade(produto: Produtos) {
    produto.quantidade++

    this.calcularTotal()
  }

  subtrairQuantidade(produto: Produtos) {
    if(produto.quantidade > 0){
      produto.quantidade--
      this.calcularTotal()

    }
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
}
