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
      valor: 305.90,
      fotos: ["assets/img/k380-multi-device-bluetooth-keyboard-_1__2.png"],
      categoria: "Teclados"
    },
    {
      id: 2,
      nome: "POP KEYS",
      resumo: "Teclado mecânico sem fio com teclas emoji personalizáveis",
      descricao: "Deixe a personalidade estourar na sua mesa e além com POP Keys. Junto com um mouse POP correspondente, deixe seu verdadeiro eu brilhar com uma estética de mesa impressionante e teclas de emoji personalizáveis e divertidas.",
      valor: 764.90,
      fotos: ["assets/img/pop-keys-gallery-daydream-1.webp", "assets/img/pop-keys-gallery-daydream-6.webp", "assets/img/pop-keys-gallery-daydream-2.webp"],
      categoria: "Teclados"
    },
    {
      id: 3,
      nome: "TECLADO BLUETOOTH K480 PARA VÁRIOS DISPOSITIVOS",
      resumo: "Alterne entre seu computador, telefone e tablet",
      descricao: "K480 é um teclado multi-dispositivo confortável e com economia de espaço que traz melhor digitação para seu laptop, tablet ou telefone. Com durabilidade impressionante e bateria de longa duração, esse design compacto é o que todos precisam para realizar várias tarefas e realizar mais (em qualquer lugar).",
      valor: 400.90,
      fotos: ["assets/img/bluetooth-multi-device-keboard-k480-_2__1.png", "assets/img/k480-gallery-black-2-new.webp", "assets/img/k480-gallery-black-4-new.webp", "assets/img/bluetooth-multi-device-keyboard-k480_1.png"],
      categoria: "Teclados"
    },
    {
      id: 4,
      nome: "Teclado Mecânico Gamer Sem Fio Logitech G715 RGB LIGHTSYNC Com Switch GX Red Linear",
      resumo: "Teclado Mecânico Gamer Sem Fio Logitech G715 RGB LIGHTSYNC Com Switch GX Red Linear",
      descricao: "O teclado para jogos sem fio G715 é um teclado mecânico compacto, sem teclas numéricas que oferece digitação confortável e desempenho de alta qualidade. Expresse-se e jogue do seu jeito. Flutue com o visual cativante do G715 e apoio para as mãos confortável. Com layout TKL compacto e altura ajustável, você sente conforto durante o jogo o tempo inteiro. Conta também com LIGHTSYNC, que possibilita personalizar seu G715 com quatro modos diferentes de animações ou personalizar o visual da sua iluminação e dos efeitos de animação com cerca de 16,8 milhões de cores RGB programáveis usando o software G HUB.",
      valor: 1399.00,
      fotos: ["assets/img/teclado06.png"],
      categoria: "Teclados"
    },
    {
      id: 5,
      nome: "Mouse sem fio Logitech M220 - Rosa",
      resumo: "Design Ambidestro Compacto, Conexão USB e Pilha Inclusa",
      descricao: "Com o mesmo clique e 90% de redução de ruído comparado aos mouses clássicos, o M220 SILENT oferece uma experiência silenciosa para você e aqueles que o cercam. Ainda oferece 18 meses de vida útil das pilhas no modo de espera e 10 metros de alcance sem fio com criptografia de 128 bits entre o mouse e o receptor. Além disso, seu tamanho reduzido é perfeito para levar em viagens. Basta conectar o receptor USB que funciona com Windows®, Mac, Chrome OS ou Linux®. Por fim, o Logitech® Advanced Optical Tracking foi desenvolvido para oferecer movimentos precisos em qualquer superfície.",
      valor: 86.90,
      fotos: ["assets/img/mouse1-1.png", "assets/img/mouse1-2.png"],
      categoria: "Mouses"
    },
    {
      id: 6,
      nome: "Mouse Gamer Sem Fio Logitech G705 LIGHTSPEED",
      resumo: "RGB LIGHTSYNC, Design Compacto, 6 Botões Programáveis, Bateria Recarregável, Conexão Bluetooth, Compatível com Windows, macOS, iPadOS, iOS",
      descricao: "O mouse para jogos sem fio G705, Aurora Collection foi desenvolvido para mãos pequenas, projetado para o conforto e totalmente equipado para sua melhor experiência de jogo. Com visual moderno e cativante. Projetado intencionalmente para jogadoras e jogadores com mãos menores. Forma compacta, descanso de polegar esculpido e base deslizante que fornecem horas confortáveis em seus jogos favoritos.",
      valor: 499.90,
      fotos: ["assets/img/mouse2-1.png", "assets/img/mouse2-2.png"],
      categoria: "Mouses"
    },
    {
      id: 7,
      nome: "Mouse Sem Fio Logitech Signature M650 L Left - Grafite",
      resumo: "Para canhotos com mãos grandes, até 2 anos de bateria, cliques silenciosos, botões personalizáveis, USB e Bluetooth Multidispositivo, Pilha inclusa.",
      descricao: "Atualize para uma rolagem mais inteligente, melhor conforto e mais produtividade. O Signature M650 possui a rolagem SmartWheel que oferece precisão ou velocidade no momento em que você precisa. A escolha de tamanhos para mãos menores, maiores e também versão canhota mostra que há um ajuste perfeito para qualquer pessoa. Conectividade sem fio perfeita, cliques silenciosos, botões laterais personalizáveis e um formato feito para proporcionar conforto e produtividade hora após hora.",
      valor: 219.90,
      fotos: ["assets/img/mouse3-1.png", "assets/img/mouse3-2.png", "assets/img/mouse3-3.png"],
      categoria: "Mouses"
    },
    {
      id: 17,
      nome: "Mouse sem fio Logitech Pebble M350 - Lilás Lemonade",
      resumo: "Clique Silencioso, Design Slim Ambidestro, Conexão USB ou Bluetooth e Pilha Inclusa",
      descricao: "Crie seu próprio espaço com o Logitech Pebble M350 – um mouse moderno, slim, silencioso e portátil projetado para seu estilo de vida. Escolha este mouse slim e moderno que cabe facilmente no bolso e pode ser levado para o café, biblioteca ou onde você quiser. Com clique e rolagem silenciosos você pode manter o foco sem perturbar as pessoas ao seu redor. A bateria tem duração de até 18 meses para que você não precise se preocupar em perda de energia. Conecte o seu Pebble do jeito que você preferir - via Bluetooth ou via receptor USB. Com rastreamento óptico de alta precisão que funciona na maioria das superfícies. *A vida útil das pilhas pode variar de acordo com a sua utilização.",
      valor: 123.90,
      fotos: ["assets/img/mouse7-1.png", "assets/img/mouse7-2.png"],
      categoria: "Mouses"
    },
    {
      id: 18,
      nome: "Teclado sem fio Logitech K380 - Lilás Lemonade",
      resumo: "Conexão Bluetooth Easy-Switch para até 3 dispositivos e Pilha Inclusa - Compatível com PC, Mac, Chrome OS, Android, iOS e Apple TV",
      descricao: "O teclado multi-dispositivo Logitech K380 traz o conforto e a conveniência da digitação para seu desktop, smartphone, tablet e muito mais. Conecte-se com até três dispositivos habilitados para Bluetooth simultaneamente e alterne instantaneamente entre eles. Como o teclado é compacto e leve, você pode usá-lo para digitar no dispositivo de sua escolha, em qualquer lugar da casa. Não importa qual dispositivo esteja conectado ao K380, a experiência de digitação é familiar e inclui teclas de atalho e favoritos. Até dois anos de autonomia das pilhas praticamente eliminam as preocupações com bateria.",
      valor: 247.90,
      fotos: ["assets/img/teclado2-1.png", "assets/img/teclado2-2.png", "assets/img/teclado2-3.png"],
      categoria: "Teclados"
    },
    {
      id: 19,
      nome: "Headset Gamer Sem Fio Logitech G435 LIGHTSPEED – Branco",
      resumo: "Conexão USB e Bluetooth - Leve, Confortável, Microfone Embutido, Bateria de até 18h - Compatível com Dolby Atmos, PC, PS4, PS5, Mobile",
      descricao: "Play never ends. Você joga, reproduz músicas e se diverte com amigos. É quem você é. Sempre. Por isso desenvolvemos o headset gamer G435 para todos os aspectos da sua vida. A combinação do LIGHTSPEED sem fio e do Bluetooth® proporciona a você a liberdade de se conectar sem fio ao PC, mobile e outros dispositivos. Os drivers de 40 mm oferecem som incrível enquanto os microfones com formação de feixe eliminam o ruído de fundo e do braço do microfone. Também tem a certificação CarbonNeutral® e foi desenvolvido com mínimo de 22% de plástico reciclado. O jogo nunca acaba com o G435.",
      valor: 699.90,
      fotos: ["assets/img/headset3-1.png", "assets/img/headset3-2.png", "assets/img/headset3-3.png"],
      categoria: "Audio"
    },
    {
      id: 20,
      nome: "Caixa de som Multimidia Logitech Z120",
      resumo: "Sistema 2.0 e Conexão 3,5mm",
      descricao: "As caixas de som estéreo Logitech Z120 simplificam a conexão de praticamente qualquer fonte de áudio. Eles obtêm energia da porta USB de seu laptop ou notebook e recebem áudio por meio de um plugue padrão de 3,5 mm, como o conector de fone de ouvido do seu MP3 player. Portanto, é fácil curtir suas músicas, vídeos favoritos e muito mais. Com controles integrados de potência e volume, é muito fácil obter o som que você deseja. O tamanho compacto não ocupa muito espaço em sua mesa ou escrivaninha, então é fácil mover as caixas de som de uma sala para outra. E o sistema de gerenciamento de cabos ajuda a eliminar a confusão de cabos.",
      valor: 169.90,
      fotos: ["assets/img/caixa1-1.png", "assets/img/caixa1-2.png"],
      categoria: "Audio"
    },
    {
      id: 21,
      nome: "Teclado Mecânico sem fio Logitech POP Keys - Amarelo Blast",
      resumo: "Com Teclas Emoji Personalizáveis, Design Compacto Durável, Conexão USB ou Bluetooth",
      descricao: "Deixe sua personalidade dominar a sua mesa com o POP Keys. O novo teclado mecânico da Logitech vem com oito teclas Emoji que podem ser trocadas e um botão de menu Emoji, todos personalizáveis por meio do software Logitech Options. Escolha o modelo que combine com você e desfrute de uma experiência nostálgica, semelhante à de uma máquina de escrever retrô, com conexão multi-dispositivo (via Bluetooth® ou receptor Logi Bolt USB) e uma série de novos atalhos incríveis. O design compacto do POP Keys economiza espaço na área de trabalho e incentiva uma melhor postura corporal. Além disso, oferece longa durabilidade e resitência e conta com pilhas de até três anos de autonomia. Aproveite e pareie com o POP mouse para uma experiência de autoexpressão completa.",
      valor: 764.90,
      fotos: ["assets/img/teclado3-1.png", "assets/img/teclado3-2.png", "assets/img/teclado3-3.png", "assets/img/teclado3-4.png"],
      categoria: "Teclados"
    },
    {
      id: 22,
      nome: "Mouse sem fio Logitech Pebble M350 - Branco",
      resumo: "Clique Silencioso, Design Slim Ambidestro, Conexão USB ou Bluetooth e Pilha Inclusa",
      descricao: "Crie seu próprio espaço com o Logitech Pebble M350 – um mouse moderno, slim, silencioso e portátil projetado para seu estilo de vida. Escolha este mouse slim e moderno que cabe facilmente no bolso e pode ser levado para o café, biblioteca ou onde você quiser. Com clique e rolagem silenciosos você pode manter o foco sem perturbar as pessoas ao seu redor. A bateria tem duração de até 18 meses para que você não precise se preocupar em perda de energia. Conecte o seu Pebble do jeito que você preferir - via Bluetooth ou via receptor USB. Com rastreamento óptico de alta precisão que funciona na maioria das superfícies. *A vida útil das pilhas pode variar de acordo com a sua utilização.",
      valor: 123.90,
      fotos: ["assets/img/mouse8-1.png", "assets/img/mouse8-2.png"],
      categoria: "Mouses"
    },
  ]

  lancamentos: Produto[] = [
    {
      id: 8,
      nome: "Headset com fio USB Logitech H390 - Branco",
      resumo: "Almofadas Confortáveis, Controles de Áudio Integrado e Microfone com Redução de Ruído",
      descricao: "Conheça o Headset com fio Logitech H390 com áudio cristalino e controles práticos no cabo. Experimente ligações claras com uma conexão USB plug-and-play simples e um microfone com cancelamento de ruído. Os controles no cabo permitem controlar o volume ou silenciar sem interromper as ligações. Drivers do fone de ouvido precisamente ajustados fornecem um áudio digital aprimorado para reuniões, músicas e mais. As partes plásticas no H390 contém plástico reciclado pós-consumo (23%*). E para embalagens responsáveis, usamos papel com certificado FSC . *Exclui componentes eletrônicos (EE), cabos e embalagens.",
      valor: 257.90,
      fotos: ["assets/img/headset1-1.png", "assets/img/headset1-2.png", "assets/img/headset1-3.png"],
      categoria: "Audio"
    },
    {
      id: 9,
      nome: "Headset com fio USB Logitech H390 - Rosa",
      resumo: "Almofadas Confortáveis, Controles de Áudio Integrado e Microfone com Redução de Ruído",
      descricao: "Conheça o Headset com fio Logitech H390 com áudio cristalino e controles práticos no cabo. Experimente ligações claras com uma conexão USB plug-and-play simples e um microfone com cancelamento de ruído. Os controles no cabo permitem controlar o volume ou silenciar sem interromper as ligações. Drivers do fone de ouvido precisamente ajustados fornecem um áudio digital aprimorado para reuniões, músicas e mais. As partes plásticas no H390 contém plástico reciclado pós-consumo (23%*). E para embalagens responsáveis, usamos papel com certificado FSC . *Exclui componentes eletrônicos (EE), cabos e embalagens.",
      valor: 257.90,
      fotos: ["assets/img/headset2-1.png", "assets/img/headset2-2.png", "assets/img/headset2-3.png"],
      categoria: "Audio"
    },
    {
      id: 10,
      nome: "Mouse sem fio Logitech M170 - Azul Claro",
      resumo: "Design Ambidestro Compacto, Conexão USB e Pilha Inclusa",
      descricao: "Mouse sem fio Logitech M170 Escolha uma conexão sem fio confiável com o mouse sem fio Logitech M170. Este mouse é prático e sem complicações, conta uma duração de bateria de até 12 meses (1) e funciona com os sistemas operacionais Windows, macOS, Linux, Chrome OS, ipadOS e Android. Principais características: Tecnologia de conectividade do dispositivo: sem fio Tecnologia sem fio do dispositivo: radiofrequência Detecção de Movimento: Óptico Número total de botões: 2 Tipo de rolagem: roda de rolagem Ajuste ergonômico do mouse: simétrico Interface de recepção do dispositivo: USB Altura: 35,2 mm Largura: 61,5 mm Profundidade: 97,7 mm Peso com pilha (aproximado): 79,5 g Dispositivo Suportado: Computador Ecológico: Sim Alcance sem fio: até 10 metros (2) (1) A duração da pilha pode variar de acordo com o usuário e as condições de computação (2) O alcance sem fio real pode variar com base no uso, configurações e condições ambientais",
      valor: 71.90,
      fotos: ["assets/img/mouse4-1.png", "assets/img/mouse4-2.png", "assets/img/mouse4-3.png"],
      categoria: "Mouses"
    },
    {
      id: 11,
      nome: "Mouse sem fio Logitech M170 - Branco",
      resumo: "Design Ambidestro Compacto, Conexão USB e Pilha Inclusa",
      descricao: "Mouse sem fio Logitech M170 Escolha uma conexão sem fio confiável com o mouse sem fio Logitech M170. Este mouse é prático e sem complicações, conta uma duração de bateria de até 12 meses (1) e funciona com os sistemas operacionais Windows, macOS, Linux, Chrome OS, ipadOS e Android. Principais características: Tecnologia de conectividade do dispositivo: sem fio Tecnologia sem fio do dispositivo: radiofrequência Detecção de Movimento: Óptico Número total de botões: 2 Tipo de rolagem: roda de rolagem Ajuste ergonômico do mouse: simétrico Interface de recepção do dispositivo: USB Altura: 35,2 mm Largura: 61,5 mm Profundidade: 97,7 mm Peso com pilha (aproximado): 79,5 g Dispositivo Suportado: Computador Ecológico: Sim Alcance sem fio: até 10 metros (2) (1) A duração da pilha pode variar de acordo com o usuário e as condições de computação (2) O alcance sem fio real pode variar com base no uso, configurações e condições ambientais",
      valor: 71.90,
      fotos: ["assets/img/mouse5-1.png", "assets/img/mouse5-2.png", "assets/img/mouse5-3.png"],
      categoria: "Mouses"
    },
    {
      id: 12,
      nome: "Mouse sem fio Logitech M170 - Rosa",
      resumo: "Design Ambidestro Compacto, Conexão USB e Pilha Inclusa",
      descricao: "Mouse sem fio Logitech M170 Escolha uma conexão sem fio confiável com o mouse sem fio Logitech M170. Este mouse é prático e sem complicações, conta uma duração de bateria de até 12 meses (1) e funciona com os sistemas operacionais Windows, macOS, Linux, Chrome OS, ipadOS e Android. Principais características: Tecnologia de conectividade do dispositivo: sem fio Tecnologia sem fio do dispositivo: radiofrequência Detecção de Movimento: Óptico Número total de botões: 2 Tipo de rolagem: roda de rolagem Ajuste ergonômico do mouse: simétrico Interface de recepção do dispositivo: USB Altura: 35,2 mm Largura: 61,5 mm Profundidade: 97,7 mm Peso com pilha (aproximado): 79,5 g Dispositivo Suportado: Computador Ecológico: Sim Alcance sem fio: até 10 metros (2) (1) A duração da pilha pode variar de acordo com o usuário e as condições de computação (2) O alcance sem fio real pode variar com base no uso, configurações e condições ambientais",
      valor: 71.90,
      fotos: ["assets/img/mouse6-1.png", "assets/img/mouse6-2.png", "assets/img/mouse6-3.png"],
      categoria: "Mouses"
    },
    {
      id: 13,
      nome: "Webcam Full HD Logitech Brio 300 - Branco",
      resumo: "Microfone com Redução de Ruído, Proteção de Privacidade, Correção Automática de Luz e Conexão USB-C",
      descricao: "Conheça a webcam full hd Brio 300 da Logitech. Garanta sua melhor imagem ajustando o ângulo ideial para suas reuniões e tenha uma aparência mais natural graças à resolução de 1080p e à correção automática de luz. Um microfone com redução de ruído suprime o barulho de fundo para que outras pessoas possam ouvi-lo claramente. Gire o protetor de privacidade para cobrir a lente quando não quiser ser visto. A Brio 300 é certificada para Microsoft Teams, Google Meet e Zoom. Adicione um toque de personalidade ao seu espaço de trabalho com uma webcam de formato circular e design moderno feita de pelo menos 48% de plástico reciclado. (3) (1) Faça o download gratuito do Logi Tune para uma experiência personalizada. Atualmente, o aplicativo Logi Tune oferece suporte a comandos de voz de fone de ouvido nos seguintes idiomas: inglês, francês, alemão, italiano, espanhol e português. (2) Logi Tune não está disponível para Chrome OS (3) O conteúdo plástico da webcam pode variar de acordo com a cor. Exclui componentes eletrônicos (EE), cabos e embalagens. 62% para grafite e preto, 48% para off-white e rosa. (4) Dispositivos habilitados para Bluetooth que suportam teclados externos",
      valor: 499.90,
      fotos: ["assets/img/web1-1.png", "assets/img/web1-2.png", "assets/img/web1-3.png", "assets/img/web1-4.png"],
      categoria: "Webcams"
    },
    {
      id: 14,
      nome: "Webcam Full HD Logitech Brio 300 - Grafite",
      resumo: "Microfone com Redução de Ruído, Proteção de Privacidade, Correção Automática de Luz e Conexão USB-C",
      descricao: "Conheça a webcam full hd Brio 300 da Logitech. Garanta sua melhor imagem ajustando o ângulo ideial para suas reuniões e tenha uma aparência mais natural graças à resolução de 1080p e à correção automática de luz. Um microfone com redução de ruído suprime o barulho de fundo para que outras pessoas possam ouvi-lo claramente. Gire o protetor de privacidade para cobrir a lente quando não quiser ser visto. A Brio 300 é certificada para Microsoft Teams, Google Meet e Zoom. Adicione um toque de personalidade ao seu espaço de trabalho com uma webcam de formato circular e design moderno feita de pelo menos 48% de plástico reciclado. (3) (1) Faça o download gratuito do Logi Tune para uma experiência personalizada. Atualmente, o aplicativo Logi Tune oferece suporte a comandos de voz de fone de ouvido nos seguintes idiomas: inglês, francês, alemão, italiano, espanhol e português. (2) Logi Tune não está disponível para Chrome OS (3) O conteúdo plástico da webcam pode variar de acordo com a cor. Exclui componentes eletrônicos (EE), cabos e embalagens. 62% para grafite e preto, 48% para off-white e rosa. (4) Dispositivos habilitados para Bluetooth que suportam teclados externos",
      valor: 499.90,
      fotos: ["assets/img/web2-1.png", "assets/img/web2-2.png", "assets/img/web2-3.png", "assets/img/web2-4.png"],
      categoria: "Webcams"
    },
    {
      id: 15,
      nome: "Webcam Full HD Logitech Brio 300 - Rosa",
      resumo: "Microfone com Redução de Ruído, Proteção de Privacidade, Correção Automática de Luz e Conexão USB-C",
      descricao: "Conheça a webcam full hd Brio 300 da Logitech. Garanta sua melhor imagem ajustando o ângulo ideial para suas reuniões e tenha uma aparência mais natural graças à resolução de 1080p e à correção automática de luz. Um microfone com redução de ruído suprime o barulho de fundo para que outras pessoas possam ouvi-lo claramente. Gire o protetor de privacidade para cobrir a lente quando não quiser ser visto. A Brio 300 é certificada para Microsoft Teams, Google Meet e Zoom. Adicione um toque de personalidade ao seu espaço de trabalho com uma webcam de formato circular e design moderno feita de pelo menos 48% de plástico reciclado. (3) (1) Faça o download gratuito do Logi Tune para uma experiência personalizada. Atualmente, o aplicativo Logi Tune oferece suporte a comandos de voz de fone de ouvido nos seguintes idiomas: inglês, francês, alemão, italiano, espanhol e português. (2) Logi Tune não está disponível para Chrome OS (3) O conteúdo plástico da webcam pode variar de acordo com a cor. Exclui componentes eletrônicos (EE), cabos e embalagens. 62% para grafite e preto, 48% para off-white e rosa. (4) Dispositivos habilitados para Bluetooth que suportam teclados externos",
      valor: 499.90,
      fotos: ["assets/img/web3-1.png", "assets/img/web3-2.png", "assets/img/web3-3.png", "assets/img/web3-4.png"],
      categoria: "Webcams"
    },
    {
      id: 16,
      nome: "Teclado Mecânico Gamer Logitech G413 TKL SE - Preto",
      resumo: "Teclado Mecânico Gamer Logitech G413 TKL SE - Preto",
      descricao: "Melhore sua experiência de jogo com o Teclado Mecânico Gamer Logitech G413 TKL SE. Proporcionando uma experiência de jogo aprimorada com switch mecânico, ele foi projetado para ajudar os jogadores a terem um desempenho superior e a se esforçarem ainda mais. O G413 TKL SE possui switches mecânicos tactile; teclas PBT; 6 teclas de desempenho anti-ghosting; um top case de alumínio escovado em preto com iluminação LED branca; 12 teclas FN e tecnologia com fio USB - tudo ao seu alcance. Disponível também na versao padrão com 104 teclas. As primeiras características do jogo são as que você precisa para colocar um desempenho melhor ao seu alcance. Um teclado projetado para performance. Um teclado Made for Play.",
      valor: 549.90,
      fotos: ["assets/img/teclado1-1.png", "assets/img/teclado1-2.png"],
      categoria: "Teclados"
    },
  ]





}
