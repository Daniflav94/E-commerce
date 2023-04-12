import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from 'src/app/interfaces/produto';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.scss']
})
export class CriarProdutoComponent {

  formProd: FormGroup

  constructor(
    fb: FormBuilder,
    private produtoService: ProdutoService,
    private notificacao: NotificacaoService
    ){
    this.formProd = fb.group({
      name: ['', [Validators.required]],
      picture_url: ['', Validators.required],
      description: ['', Validators.required],
      resume: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  isLoading = false
  fotoURL: string = ''
  file?: File

  criarProduto(){
    if(this.formProd.valid){
      const produto: Produto = this.formProd.value
      produto.picture_url = this.fotoURL
      this.produtoService.criarProduto(produto).subscribe(() => {
        this.notificacao.showmessage("Produto criado!")
        this.formProd.reset()
      })
    }

  }

  uploadFile(event: any){
    this.file = <File>event.target.files[0];

        this.fotoURL = `assets/img/${this.file?.name}`
        console.log(this.file?.name)
  }

}
