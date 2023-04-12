import { Injectable } from '@angular/core';
import { Produto } from '../interfaces/produto';
import { NotificacaoService } from './notificacao.service';
import { Sacola } from '../interfaces/sacola';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SacolaService {
  sacola: Sacola = {
    produtos: [],
    valorTotal: 0
  }

  sacolaObs$ = new BehaviorSubject(this.sacola)

  constructor(private notificacao: NotificacaoService) {
    let dadosSacola = JSON.parse(localStorage.getItem('sacola') as string)
    if(dadosSacola) {
      this.sacolaObs$.next(dadosSacola)
      this.sacola = dadosSacola
    }
  }

  adicionarProduto(produto: Produto, quantidade: number): void {

    const prod = {
      produto: {
        id: produto.id,
        name: produto.name,
        resume: produto.resume,
        description: produto.description,
        price: produto.price,
        picture_url: produto.picture_url,
        category: produto.category,
      },
      quantidade: quantidade
    }

    if(!this.verificarProduto(produto.id)) {
        this.sacola.produtos.push(prod)

    } else {
      let atualizarProdutos = [...this.sacola.produtos]
      let indexProduto = atualizarProdutos.findIndex((prod) => prod.produto.id == produto.produto.id)
      let produto = atualizarProdutos[indexProduto]

      if(quantidade){
        atualizarProdutos[indexProduto] = {
          ...produto,
          quantidade: quantidade
        }
      } else {

        atualizarProdutos[indexProduto] = {
          ...produto,
          quantidade: produto.quantidade + 1
        }
      }

      this.sacola.produtos = atualizarProdutos
    }

    this.sacola.valorTotal = this.getTotal()
    this.notificacao.showmessage("Produto adicionado!")
    this.sacolaObs$.next({ ...this.sacola })
    localStorage.setItem('sacola', JSON.stringify(this.sacola))
  }

  atualizarSacola(id: number, quantidade: number): void {
    let produtosAtualizados = [...this.sacola.produtos]
    let indexProduto = produtosAtualizados.findIndex((prod) => prod.produto.id == id)

    produtosAtualizados[indexProduto] = {
      ...produtosAtualizados[indexProduto],
      quantidade: quantidade
    }

    this.sacola.produtos = produtosAtualizados
    this.sacola.valorTotal = this.getTotal()
    this.sacolaObs$.next({ ...this.sacola })
    localStorage.setItem('sacola', JSON.stringify(this.sacola))
  }

  removerProdutos(id: number): void {
    let produtosAtualizados = this.sacola.produtos.filter(
      (prod) => prod.produto.id !== id
    )

    this.sacola.produtos = produtosAtualizados
    this.sacola.valorTotal = this.getTotal()
    this.sacolaObs$.next({ ...this.sacola })
    localStorage.setItem('sacola', JSON.stringify(this.sacola))
  }

  verificarProduto(id: number): boolean{
    return this.sacola.produtos.findIndex((prod) => prod.produto.id == id) !== -1
  }

  getTotal(): number {
    let total = 0
    this.sacola.produtos.forEach(
      (prod) => (total += prod.produto.price * prod.quantidade)
    )
    return total
  }
}
