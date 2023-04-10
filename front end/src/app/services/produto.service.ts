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

  criarProduto(produto: Produto) {

    return this.httpClient.post(`${this.API}/adm/create_new_product`, produto)
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
