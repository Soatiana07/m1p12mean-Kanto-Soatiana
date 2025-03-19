import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  private apiUrl = `${environment.apiUrl}/pieces`;
  constructor(private http: HttpClient) { }

  getPiece(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addPiece(nomPiece: string, referencePiece: string, typePiece: string): Observable<any> {
    const body = { nomPiece, referencePiece, typePiece };
    return this.http.post(this.apiUrl, body);
  }


  updatePiece(id: string,nomPiece: string, referencePiece: string, typePiece: string): Observable<any> {
    const body = { nomPiece, referencePiece, typePiece };
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

}
