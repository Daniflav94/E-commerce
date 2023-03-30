import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../interfaces/endereco';
import { catchError, EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private readonly API = 'https://viacep.com.br/ws/'

  constructor(private httpClient: HttpClient) { }

  pesquisarCep(cep: string) {
    return this.httpClient.get<Endereco>(`${this.API}${cep}/json`).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }
}
