import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntreePieceService {
  private apiUrl = `${environment.apiUrl}/entreePiece`;
  private apiUrlFournisseur = `${environment.apiUrl}/fournisseur/chercheFournisseur`;
  private apiUrlPiece = `${environment.apiUrl}/pieces/cherchePiece`;
  constructor(private http: HttpClient) { }

  getEntreePiece(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addEntreePiece(dateEntree: string, idFournisseur: string, numeroBl: string): Observable<any> {
    const body = { dateEntree, idFournisseur, numeroBl };
    return this.http.post(this.apiUrl, body);
  }

  updateEntreePiece(id: string,dateEntree: string, idFournisseur: string, numeroBl: string): Observable<any> {
    const body =  { dateEntree, idFournisseur, numeroBl };
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  searchFournisseur(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlFournisseur}?q=${query}`);
  }

  searchPiece(query: string): Observable<any> {
    return this.http.get(`${this.apiUrlPiece}?q=${query}`);
  }
}
