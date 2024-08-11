import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
