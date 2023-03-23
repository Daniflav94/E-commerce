import { Component, ViewChild } from '@angular/core';
import { NgxGlideComponent } from 'ngx-glide/lib/ngx-glide.component';
import { Produto } from 'src/app/interfaces/produto';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.scss']
})
export class DestaquesComponent {

  @ViewChild('ngxGlide') ngxGlide!: NgxGlideComponent;

  destaques: Produto[] = [
    {
      id: 1,
      nome: "Teclado sem fio Logitech K480",
      resumo: "Suporte Integrado para Smartphone e Tablet, Conexão Bluetooth Easy-Switch para até 3 dispositivos e Pilha Inclusa",
      descricao: "O K480 é um teclado sem fio com conexão Bluetooth e Multi-Device exclusivo para o seu computador ... que também funciona com o seu tablet e smartphone. O Easy-Switch permite que você alterne a digitação facilmente entre 3 dispositivos sem fio Bluetooth conectados e a base integrada mantém seu telefone ou tablet no ângulo certo para você ler enquanto digita. Você encontrará um layout de teclado familiar com todas as teclas de atalho que você mais usa, quer esteja digitando em um computador Windows, Mac ou Chrome, ou em um tablet ou smartphone Android ou iOS.",
      valor: "R$305,90",
      fotos: ["assets/img/k380-multi-device-bluetooth-keyboard-_1__2.png"],
      categoria: "Teclados"
    },
    {
      id: 2,
      nome: "POP KEYS",
      resumo: "Teclado mecânico sem fio com teclas emoji personalizáveis",
      descricao: "Deixe a personalidade estourar na sua mesa e além com POP Keys. Junto com um mouse POP correspondente, deixe seu verdadeiro eu brilhar com uma estética de mesa impressionante e teclas de emoji personalizáveis e divertidas.",
      valor: "R$764,90",
      fotos: ["assets/img/pop-keys-gallery-daydream-1.webp", "assets/img/pop-keys-gallery-daydream-6.webp", "assets/img/pop-keys-gallery-daydream-2.webp"],
      categoria: "Teclados"
    },
    {
      id: 3,
      nome: "TECLADO BLUETOOTH K480 PARA VÁRIOS DISPOSITIVOS",
      resumo: "Alterne entre seu computador, telefone e tablet",
      descricao: "K480 é um teclado multi-dispositivo confortável e com economia de espaço que traz melhor digitação para seu laptop, tablet ou telefone. Com durabilidade impressionante e bateria de longa duração, esse design compacto é o que todos precisam para realizar várias tarefas e realizar mais (em qualquer lugar).",
      valor: "R$305,90",
      fotos: ["assets/img/bluetooth-multi-device-keboard-k480-_2__1.png", "assets/img/k480-gallery-black-2-new.webp", "assets/img/k480-gallery-black-4-new.webp", "assets/img/bluetooth-multi-device-keyboard-k480_1.png"],
      categoria: "Teclados"
    },
    {
      id: 4,
      nome: "Teclado Mecânico Gamer Sem Fio Logitech G715 RGB LIGHTSYNC Com Switch GX Red Linear",
      resumo: "Teclado Mecânico Gamer Sem Fio Logitech G715 RGB LIGHTSYNC Com Switch GX Red Linear",
      descricao: "O teclado para jogos sem fio G715 é um teclado mecânico compacto, sem teclas numéricas que oferece digitação confortável e desempenho de alta qualidade. Expresse-se e jogue do seu jeito. Flutue com o visual cativante do G715 e apoio para as mãos confortável. Com layout TKL compacto e altura ajustável, você sente conforto durante o jogo o tempo inteiro. Conta também com LIGHTSYNC, que possibilita personalizar seu G715 com quatro modos diferentes de animações ou personalizar o visual da sua iluminação e dos efeitos de animação com cerca de 16,8 milhões de cores RGB programáveis usando o software G HUB.",
      valor: "R$1399,00",
      fotos: ["assets/img/teclado06.png"],
      categoria: "Teclados"
    }
  ]



}
