import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.scss']
})
export class CriarProdutoComponent {

  formProd: FormGroup

  constructor(fb: FormBuilder){
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

  }

  uploadFile(event: any){
    this.file = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.fotoURL = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
