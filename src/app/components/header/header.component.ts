import { Component } from '@angular/core';
import { Produto } from 'src/app/interfaces/produto';
import { Sacola } from 'src/app/interfaces/sacola';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  pesquisa: boolean = false
  showFiller = false;

  produtos: Sacola[] = [{
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
    quantidade: 2
  }
  ]

  somarQuantidade(produto: Sacola) {
    produto.quantidade++
  }

  subtrairQuantidade(produto: Sacola) {
    if(produto.quantidade > 1){
      produto.quantidade--
    }
  }

}
