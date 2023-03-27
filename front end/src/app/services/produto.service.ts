import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:8080/produto'

  constructor(
    private httpClient: HttpClient
  ) { }

  listarProdutos() {
    return this.httpClient.get<Produto[]>(this.API).pipe(
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
}
