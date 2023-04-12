import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { Produto } from '../interfaces/produto';
import { Categoria } from '../interfaces/categoria';
import { API_URL } from 'src/config';
import { ListaProdutos } from '../interfaces/listaProdutos';

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
    const params = new HttpParams()
      .set('name', produto.name)
      .set('picture_url', produto.picture_url)
      .set('description', produto.description)
      .set('price', produto.price)
      .set('is_available', 'True')
      .set('category', produto.category)
      .set('resume', produto.resume)
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
    return this.httpClient.get<ListaProdutos>(`${this.API}/core/get_products?pk=1`, {params}).pipe(
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
