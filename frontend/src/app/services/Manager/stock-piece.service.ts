import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockPieceService {
  private apiUrl = `${environment.apiUrl}/stockPiece`;
  private apiUrlStockByPiece = `${environment.apiUrl}/stockPiece/stockByPiece`;
  constructor(private http: HttpClient) { }

    getStockPiece(): Observable<any> {
      return this.http.get(this.apiUrl);
    }

    getStockPieceByPiece(idPiece: string): Observable<any> {
      return this.http.get(`${this.apiUrlStockByPiece}/${idPiece}`);
    }


}
