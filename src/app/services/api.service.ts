import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.pokemontcg.io/v2/cards';
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getCards(params?: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey,
    });
    return this.http.get<any>(this.apiUrl + params, { headers });
  }
}
