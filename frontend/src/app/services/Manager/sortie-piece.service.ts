import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SortiePieceService {

  private apiUrl = `${environment.apiUrl}/sortiePiece`;
  private apiUrlSommeSortie = `${environment.apiUrl}/sortiePiece/totalSortie`;
  private apiUrdetailSortiePiece = `${environment.apiUrl}/detailSortiePiece/detailSortiePieceByPiece`;
  constructor(private http: HttpClient) { }


    addSortiePiece( dateSortie: string, idDevis: string,idModePaiement: string, details: any): Observable<any> {
      const body = { dateSortie, idDevis,idModePaiement, details };
      return this.http.post(this.apiUrl, body);
    }

    getSortiePiece(): Observable<any> {
      return this.http.get(this.apiUrl);
    }

    prixTotalByIdSortie(idSortiePiece: string): Observable<any> {
      return this.http.get(`${this.apiUrlSommeSortie}/${idSortiePiece}`);
    }

    getDetailSortiePieceByPiece(idSortiePiece: string): Observable<any> {
      return this.http.get(`${this.apiUrdetailSortiePiece}/${idSortiePiece}`);
    }


}
