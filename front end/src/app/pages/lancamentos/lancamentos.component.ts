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
    this.listarProdutos()
  }

  lancamentos: Produto[] = [
    {
      id: 8,
      name: "Headset com fio USB Logitech H390 - Branco",
      resumo: "Almofadas Confortáveis, Controles de Áudio Integrado e Microfone com Redução de Ruído",
      description: "Conheça o Headset com fio Logitech H390 com áudio cristalino e controles práticos no cabo. Experimente ligações claras com uma conexão USB plug-and-play simples e um microfone com cancelamento de ruído. Os controles no cabo permitem controlar o volume ou silenciar sem interromper as ligações. Drivers do fone de ouvido precisamente ajustados fornecem um áudio digital aprimorado para reuniões, músicas e mais. As partes plásticas no H390 contém plástico reciclado pós-consumo (23%*). E para embalagens responsáveis, usamos papel com certificado FSC . *Exclui componentes eletrônicos (EE), cabos e embalagens.",
      price: 257.90,
      picture_url: ["assets/img/headset1-1.png", "assets/img/headset1-2.png", "assets/img/headset1-3.png"],
      category: "Audio"
    },
    {
      id: 9,
      name: "Headset com fio USB Logitech H390 - Rosa",
      resumo: "Almofadas Confortáveis, Controles de Áudio Integrado e Microfone com Redução de Ruído",
      description: "Conheça o Headset com fio Logitech H390 com áudio cristalino e controles práticos no cabo. Experimente ligações claras com uma conexão USB plug-and-play simples e um microfone com cancelamento de ruído. Os controles no cabo permitem controlar o volume ou silenciar sem interromper as ligações. Drivers do fone de ouvido precisamente ajustados fornecem um áudio digital aprimorado para reuniões, músicas e mais. As partes plásticas no H390 contém plástico reciclado pós-consumo (23%*). E para embalagens responsáveis, usamos papel com certificado FSC . *Exclui componentes eletrônicos (EE), cabos e embalagens.",
      price: 257.90,
      picture_url: ["assets/img/headset2-1.png", "assets/img/headset2-2.png", "assets/img/headset2-3.png"],
      category: "Audio"
    },
    {
      id: 10,
      name: "Mouse sem fio Logitech M170 - Azul Claro",
      resumo: "Design Ambidestro Compacto, Conexão USB e Pilha Inclusa",
      description: "Mouse sem fio Logitech M170 Escolha uma conexão sem fio confiável com o mouse sem fio Logitech M170. Este mouse é prático e sem complicações, conta uma duração de bateria de até 12 meses (1) e funciona com os sistemas operacionais Windows, macOS, Linux, Chrome OS, ipadOS e Android. Principais características: Tecnologia de conectividade do dispositivo: sem fio Tecnologia sem fio do dispositivo: radiofrequência Detecção de Movimento: Óptico Número total de botões: 2 Tipo de rolagem: roda de rolagem Ajuste ergonômico do mouse: simétrico Interface de recepção do dispositivo: USB Altura: 35,2 mm Largura: 61,5 mm Profundidade: 97,7 mm Peso com pilha (aproximado): 79,5 g Dispositivo Suportado: Computador Ecológico: Sim Alcance sem fio: até 10 metros (2) (1) A duração da pilha pode variar de acordo com o usuário e as condições de computação (2) O alcance sem fio real pode variar com base no uso, configurações e condições ambientais",
      price: 71.90,
      picture_url: ["assets/img/mouse4-1.png", "assets/img/mouse4-2.png", "assets/img/mouse4-3.png"],
      category: "Mouses"
    },
    {
      id: 11,
      name: "Mouse sem fio Logitech M170 - Branco",
      resumo: "Design Ambidestro Compacto, Conexão USB e Pilha Inclusa",
      description: "Mouse sem fio Logitech M170 Escolha uma conexão sem fio confiável com o mouse sem fio Logitech M170. Este mouse é prático e sem complicações, conta uma duração de bateria de até 12 meses (1) e funciona com os sistemas operacionais Windows, macOS, Linux, Chrome OS, ipadOS e Android. Principais características: Tecnologia de conectividade do dispositivo: sem fio Tecnologia sem fio do dispositivo: radiofrequência Detecção de Movimento: Óptico Número total de botões: 2 Tipo de rolagem: roda de rolagem Ajuste ergonômico do mouse: simétrico Interface de recepção do dispositivo: USB Altura: 35,2 mm Largura: 61,5 mm Profundidade: 97,7 mm Peso com pilha (aproximado): 79,5 g Dispositivo Suportado: Computador Ecológico: Sim Alcance sem fio: até 10 metros (2) (1) A duração da pilha pode variar de acordo com o usuário e as condições de computação (2) O alcance sem fio real pode variar com base no uso, configurações e condições ambientais",
      price: 71.90,
      picture_url: ["assets/img/mouse5-1.png", "assets/img/mouse5-2.png", "assets/img/mouse5-3.png"],
      category: "Mouses"
    },
    {
      id: 12,
      name: "Mouse sem fio Logitech M170 - Rosa",
      resumo: "Design Ambidestro Compacto, Conexão USB e Pilha Inclusa",
      description: "Mouse sem fio Logitech M170 Escolha uma conexão sem fio confiável com o mouse sem fio Logitech M170. Este mouse é prático e sem complicações, conta uma duração de bateria de até 12 meses (1) e funciona com os sistemas operacionais Windows, macOS, Linux, Chrome OS, ipadOS e Android. Principais características: Tecnologia de conectividade do dispositivo: sem fio Tecnologia sem fio do dispositivo: radiofrequência Detecção de Movimento: Óptico Número total de botões: 2 Tipo de rolagem: roda de rolagem Ajuste ergonômico do mouse: simétrico Interface de recepção do dispositivo: USB Altura: 35,2 mm Largura: 61,5 mm Profundidade: 97,7 mm Peso com pilha (aproximado): 79,5 g Dispositivo Suportado: Computador Ecológico: Sim Alcance sem fio: até 10 metros (2) (1) A duração da pilha pode variar de acordo com o usuário e as condições de computação (2) O alcance sem fio real pode variar com base no uso, configurações e condições ambientais",
      price: 71.90,
      picture_url: ["assets/img/mouse6-1.png", "assets/img/mouse6-2.png", "assets/img/mouse6-3.png"],
      category: "Mouses"
    },
    {
      id: 13,
      name: "Webcam Full HD Logitech Brio 300 - Branco",
      resumo: "Microfone com Redução de Ruído, Proteção de Privacidade, Correção Automática de Luz e Conexão USB-C",
      description: "Conheça a webcam full hd Brio 300 da Logitech. Garanta sua melhor imagem ajustando o ângulo ideial para suas reuniões e tenha uma aparência mais natural graças à resolução de 1080p e à correção automática de luz. Um microfone com redução de ruído suprime o barulho de fundo para que outras pessoas possam ouvi-lo claramente. Gire o protetor de privacidade para cobrir a lente quando não quiser ser visto. A Brio 300 é certificada para Microsoft Teams, Google Meet e Zoom. Adicione um toque de personalidade ao seu espaço de trabalho com uma webcam de formato circular e design moderno feita de pelo menos 48% de plástico reciclado. (3) (1) Faça o download gratuito do Logi Tune para uma experiência personalizada. Atualmente, o aplicativo Logi Tune oferece suporte a comandos de voz de fone de ouvido nos seguintes idiomas: inglês, francês, alemão, italiano, espanhol e português. (2) Logi Tune não está disponível para Chrome OS (3) O conteúdo plástico da webcam pode variar de acordo com a cor. Exclui componentes eletrônicos (EE), cabos e embalagens. 62% para grafite e preto, 48% para off-white e rosa. (4) Dispositivos habilitados para Bluetooth que suportam teclados externos",
      price: 499.90,
      picture_url: ["assets/img/web1-1.png", "assets/img/web1-2.png", "assets/img/web1-3.png", "assets/img/web1-4.png"],
      category: "Webcams"
    },
    {
      id: 14,
      name: "Webcam Full HD Logitech Brio 300 - Grafite",
      resumo: "Microfone com Redução de Ruído, Proteção de Privacidade, Correção Automática de Luz e Conexão USB-C",
      description: "Conheça a webcam full hd Brio 300 da Logitech. Garanta sua melhor imagem ajustando o ângulo ideial para suas reuniões e tenha uma aparência mais natural graças à resolução de 1080p e à correção automática de luz. Um microfone com redução de ruído suprime o barulho de fundo para que outras pessoas possam ouvi-lo claramente. Gire o protetor de privacidade para cobrir a lente quando não quiser ser visto. A Brio 300 é certificada para Microsoft Teams, Google Meet e Zoom. Adicione um toque de personalidade ao seu espaço de trabalho com uma webcam de formato circular e design moderno feita de pelo menos 48% de plástico reciclado. (3) (1) Faça o download gratuito do Logi Tune para uma experiência personalizada. Atualmente, o aplicativo Logi Tune oferece suporte a comandos de voz de fone de ouvido nos seguintes idiomas: inglês, francês, alemão, italiano, espanhol e português. (2) Logi Tune não está disponível para Chrome OS (3) O conteúdo plástico da webcam pode variar de acordo com a cor. Exclui componentes eletrônicos (EE), cabos e embalagens. 62% para grafite e preto, 48% para off-white e rosa. (4) Dispositivos habilitados para Bluetooth que suportam teclados externos",
      price: 499.90,
      picture_url: ["assets/img/web2-1.png", "assets/img/web2-2.png", "assets/img/web2-3.png", "assets/img/web2-4.png"],
      category: "Webcams"
    },
    {
      id: 15,
      name: "Webcam Full HD Logitech Brio 300 - Rosa",
      resumo: "Microfone com Redução de Ruído, Proteção de Privacidade, Correção Automática de Luz e Conexão USB-C",
      description: "Conheça a webcam full hd Brio 300 da Logitech. Garanta sua melhor imagem ajustando o ângulo ideial para suas reuniões e tenha uma aparência mais natural graças à resolução de 1080p e à correção automática de luz. Um microfone com redução de ruído suprime o barulho de fundo para que outras pessoas possam ouvi-lo claramente. Gire o protetor de privacidade para cobrir a lente quando não quiser ser visto. A Brio 300 é certificada para Microsoft Teams, Google Meet e Zoom. Adicione um toque de personalidade ao seu espaço de trabalho com uma webcam de formato circular e design moderno feita de pelo menos 48% de plástico reciclado. (3) (1) Faça o download gratuito do Logi Tune para uma experiência personalizada. Atualmente, o aplicativo Logi Tune oferece suporte a comandos de voz de fone de ouvido nos seguintes idiomas: inglês, francês, alemão, italiano, espanhol e português. (2) Logi Tune não está disponível para Chrome OS (3) O conteúdo plástico da webcam pode variar de acordo com a cor. Exclui componentes eletrônicos (EE), cabos e embalagens. 62% para grafite e preto, 48% para off-white e rosa. (4) Dispositivos habilitados para Bluetooth que suportam teclados externos",
      price: 499.90,
      picture_url: ["assets/img/web3-1.png", "assets/img/web3-2.png", "assets/img/web3-3.png", "assets/img/web3-4.png"],
      category: "Webcams"
    },
    {
      id: 16,
      name: "Teclado Mecânico Gamer Logitech G413 TKL SE - Preto",
      resumo: "Teclado Mecânico Gamer Logitech G413 TKL SE - Preto",
      description: "Melhore sua experiência de jogo com o Teclado Mecânico Gamer Logitech G413 TKL SE. Proporcionando uma experiência de jogo aprimorada com switch mecânico, ele foi projetado para ajudar os jogadores a terem um desempenho superior e a se esforçarem ainda mais. O G413 TKL SE possui switches mecânicos tactile; teclas PBT; 6 teclas de desempenho anti-ghosting; um top case de alumínio escovado em preto com iluminação LED branca; 12 teclas FN e tecnologia com fio USB - tudo ao seu alcance. Disponível também na versao padrão com 104 teclas. As primeiras características do jogo são as que você precisa para colocar um desempenho melhor ao seu alcance. Um teclado projetado para performance. Um teclado Made for Play.",
      price: 549.90,
      picture_url: ["assets/img/teclado1-1.png", "assets/img/teclado1-2.png"],
      category: "Teclados"
    },
  ]

  adicionarProduto(produto: Produto, quantidade: number) {
    this._sacolaService.adicionarProduto(produto, quantidade)
  }

  listarProdutos():void {
    this.produtoService.listarNovidades().subscribe(lista => {
      this.lancamentos  = lista
    })
  }

}
