import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask/lib/ngx-mask.directive';
import { provideNgxMask } from 'ngx-mask/lib/ngx-mask.providers';
import { Endereco } from 'src/app/interfaces/endereco';
import { Sacola } from 'src/app/interfaces/sacola';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { ViaCepService } from 'src/app/services/via-cep.service';
import {
  calcularPrecoPrazo,
  consultarCep,
  rastrearEncomendas,
} from 'correios-brasil';
import { SacolaService } from 'src/app/services/sacola.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.component.html',
  styleUrls: ['./finalizar-compra.component.scss'],
})
export class FinalizarCompraComponent implements OnInit {

  ngOnInit(): void {
    this.calcularTotal()
    this.calcularParcelas()
    this.calcularFrete()
  }

  formInfo: FormGroup
  formPag: FormGroup

  constructor(
    fb: FormBuilder,
    private apiCep: ViaCepService,
    private notificacao: NotificacaoService,
    private _sacolaService: SacolaService

  ) {
    this._sacolaService.sacolaObs$.subscribe((resposta: Sacola) => {
      this.produtosSacola = resposta
      console.log(resposta)
    })

    this.formInfo = fb.group({
      email: ['', [Validators.email, Validators.required]],
      nome: ['', Validators.required],
      sobrenome: ['', [Validators.required]],
      genero: ['masculino', Validators.required],
      nascimento: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    }),
      this.formPag = fb.group({
        numero: ['', [Validators.required, Validators.minLength(16)]],
        parcelas: ['', [Validators.required]],
        nome: ['', [Validators.required]],
        mesValidade: ['', [Validators.required]],
        anoValidade: ['', [Validators.required]],
        codSeguranca: ['', [Validators.required, Validators.minLength(3)]],
        cpfTitular: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
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
  frete: string = ""
  totalComFrete: string = ""
  parcelas: string[] = []

  produtosSacola: Sacola = {
    id: 1,
    valorTotal: 0,
    produtos: []
  }


  calcularTotal() {
    let total: number = 0
    this.produtosSacola.produtos.forEach(prod => {
      total += (prod.produto.price * prod.quantidade)
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
    for (let index = 1; index <= 10; index++) {
      this.parcelas.push((this.produtosSacola.valorTotal / index).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) as string)
    }
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

  finalizarCompra(){

  }

  calcularFrete() {

  }

}
