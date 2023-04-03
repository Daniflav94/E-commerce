import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask/lib/ngx-mask.directive';
import { provideNgxMask } from 'ngx-mask/lib/ngx-mask.providers';
import { Endereco } from 'src/app/interfaces/endereco';
import { Sacola } from 'src/app/interfaces/sacola';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { ViaCepService } from 'src/app/services/via-cep.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.scss'],
})
export class FinalizarCompraComponent implements OnInit {

  ngOnInit(): void {
    this.calcularTotal()
    this.calcularParcelas()
  }

  formInfo: FormGroup
  formPag: FormGroup

  constructor(
    fb: FormBuilder,
    private apiCep: ViaCepService,
    private notificacao: NotificacaoService

  ) {
    this.formInfo = fb.group({
      email: ['', [Validators.email, Validators.required]],
      nome: ['', Validators.required],
      sobrenome: ['', [Validators.required]],
      genero: ['masculino', Validators.required],
      nascimento: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      telefone: ['', Validators.required]
    }),
      this.formPag = fb.group({
        numero: ['', [Validators.required]],
        parcelas: ['', [Validators.required]],
        nome: ['', [Validators.required]],
        mesValidade: ['', [Validators.required]],
        anoValidade: ['', [Validators.required]],
        codSeguranca: ['', [Validators.required]]
      })
  }

  formEndereco: Endereco = {
    cep: '',
    logradouro: '',
    localidade: '',
    uf: '',
    bairro: '',
    numero: '',
    complemento: '',
    destinatario: ''
  }

  formaPagamento: string = 'cartao'

  entregaValida: boolean = false
  informacoesValidas: boolean = false
  pagamento: boolean = false
  entrega: boolean = false
  valorTotal: string = ""
  parcelas: any = {
    parcela1: 0,
    parcela2: 0,
    parcela3: 0,
    parcela4: 0
  }
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
    this.produtosSacola.produtos.forEach(prod => {
      total += (prod.produto.valor * prod.quantidade)
      this.produtosSacola.valorTotal = total
      this.valorTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) as string
    })
  }

  consultarCep() {
    const cep: string = this.formEndereco.cep
    console.log("método cep chamado")
    this.apiCep.pesquisarCep(cep).subscribe(dados => {
      if (dados.erro) {
        window.alert("Cep inválido")
        return
      }
      this.formEndereco.logradouro = dados.logradouro
      this.formEndereco.bairro = dados.bairro
      this.formEndereco.localidade = dados.localidade
      this.formEndereco.uf = dados.uf
      console.log(dados)
    })

  }

  salvarInformacoes() {
    if (this.formInfo.valid) {
      this.entrega = true
      this.informacoesValidas = true
      this.formEndereco.destinatario = this.formInfo.value.nome
    } else {
      this.notificacao.showmessage("Preencha todos os campos obrigatórios!")
    }
  }

  salvarEndereco(form: NgForm) {
    if (form.valid) {
      this.pagamento = true
      this.entrega = false
      this.entregaValida = true
    } else {
      this.notificacao.showmessage("Preencha todos os campos obrigatórios!")
    }
  }

  editarInfo(bloco: string) {
    if (bloco == "info") {
      this.informacoesValidas = false
      this.entrega = false
    } else if (bloco == "entrega") {
      this.entregaValida = false
      this.pagamento = false
    }
  }

  calcularParcelas() {
    this.parcelas.parcela1 = this.produtosSacola.valorTotal
    this.parcelas.parcela2 = this.produtosSacola.valorTotal / 2
    this.parcelas.parcela3 = this.produtosSacola.valorTotal / 3
    this.parcelas.parcela4 = this.produtosSacola.valorTotal / 4
    }


  verificarBandeira() {
    const visa = document.getElementById('visa')
    const master = document.getElementById('master')
    const hiper = document.getElementById('hiper')
    const elo = document.getElementById('elo')

    console.log('método verificar bandeira chamado')

    const numero = this.formPag.value.numero
    if (numero[0] == '4') {
      visa?.classList.add('filter')
      master?.classList.remove('filter')
      elo?.classList.remove('filter')
      hiper?.classList.remove('filter')
    } else if (numero[0] == '5') {
      master?.classList.add('filter')
      visa?.classList.remove('filter')
      elo?.classList.remove('filter')
      hiper?.classList.remove('filter')
    } else if (numero[0] == '6') {
      elo?.classList.add('filter')
      visa?.classList.remove('filter')
      master?.classList.remove('filter')
      hiper?.classList.remove('filter')
    } else if (numero[0] == '9') {
      hiper?.classList.add('filter')
      visa?.classList.remove('filter')
      master?.classList.remove('filter')
      elo?.classList.remove('filter')
    } else {
      master?.classList.remove('filter')
      elo?.classList.remove('filter')
      hiper?.classList.remove('filter')
      visa?.classList.remove('filter')
    }
  }

}
