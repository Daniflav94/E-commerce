import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { Produto } from '../interfaces/produto';
import { Categoria } from '../interfaces/categoria';
import { API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = `${API_URL.baseUrl}`

  /* headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "aplication/json"
    })
  }; */

  constructor(
    private httpClient: HttpClient
  ) { }

  criarProduto() {
    const params = new HttpParams()
      .set('name', 'Teclado sem fio Logitech K480')
      .set('picture_url', 'k380-multi-device-bluetooth-keyboard-_1__2.png')
      .set('description', 'O K480 é um teclado sem fio com conexão Bluetooth e Multi-Device exclusivo para o seu computador ... que também funciona com o seu tablet e smartphone. O Easy-Switch permite que você alterne a digitação facilmente entre 3 dispositivos sem fio Bluetooth conectados e a base integrada mantém seu telefone ou tablet no ângulo certo para você ler enquanto digita. Você encontrará um layout de teclado familiar com todas as teclas de atalho que você mais usa, quer esteja digitando em um computador Windows, Mac ou Chrome, ou em um tablet ou smartphone Android ou iOS.')
      .set('price', '305.90')
      .set('is_available', 'True')
      .set('category', '1')
    return this.httpClient.post<Produto>(`${this.API}/adm/create_new_product`, params, {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })}).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }

  criarCategoria(categoria: Categoria) {
    const params = new HttpParams()
      .set('category', categoria.category)
      .set('description', categoria.description)

    return this.httpClient.post<Categoria>(`${this.API}/adm/create_product_category`, params, {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })}).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }

  listarProdutos() {
    const params = new HttpParams()
      .set('skip', '0')
      .set('take', '10')
    return this.httpClient.get<Produto[]>(`${this.API}/core/get_products?pk=1`, {params}).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }

  buscarPorId(id: number) {
    return this.httpClient.get<Produto>(`${this.API}/${id}`).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }

  listarDestaques() {
    return this.httpClient.get<Produto[]>(`${this.API}/destaques`).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }

  listarNovidades() {
    return this.httpClient.get<Produto[]>(`${this.API}/novidades`).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }

  listarPorCategoria(categoria: string) {
    return this.httpClient.get<Produto[]>(`${this.API}/${categoria}`).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }

  buscarPorNome(pesquisa: string) {
    return this.httpClient.get<Produto[]>(`${this.API}/${pesquisa}`).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }
}
