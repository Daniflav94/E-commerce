import { Component } from '@angular/core';
import { Produto } from 'src/app/interfaces/produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent {

  produto: Produto =
    {
      id: 3,
      nome: "TECLADO BLUETOOTH K480 PARA VÁRIOS DISPOSITIVOS",
      resumo: "Alterne entre seu computador, telefone e tablet",
      descricao: "K480 é um teclado multi-dispositivo confortável e com economia de espaço que traz melhor digitação para seu laptop, tablet ou telefone. Com durabilidade impressionante e bateria de longa duração, esse design compacto é o que todos precisam para realizar várias tarefas e realizar mais (em qualquer lugar).",
      valor: "R$305,90",
      fotos: ["assets/img/bluetooth-multi-device-keboard-k480-_2__1.png", "assets/img/k480-gallery-black-2-new.webp", "assets/img/k480-gallery-black-4-new.webp", "assets/img/bluetooth-multi-device-keyboard-k480_1.png"],
      categoria: "Teclados"
    }

    foto: string = this.produto.fotos[0]


}
