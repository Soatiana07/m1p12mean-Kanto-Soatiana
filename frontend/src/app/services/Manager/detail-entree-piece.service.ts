import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailEntreePieceService {

  private apiUrlEntreePiece = `${environment.apiUrl}/entreePiece/entreePieceById`;
  private apiUrlDetailEntreePiece = `${environment.apiUrl}/detailEntreePiece/detailEntreePieceByPiece`;
  constructor(private http: HttpClient) { }

  getEntreePieceById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrlEntreePiece}/${id}`);
  }

  getDetailEntreePieceByPiece(idEntreePiece: string): Observable<any> {
    return this.http.get(`${this.apiUrlDetailEntreePiece}/${idEntreePiece}`);
  }

}
