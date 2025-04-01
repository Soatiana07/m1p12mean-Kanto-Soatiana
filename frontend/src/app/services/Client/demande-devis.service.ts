import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DemandeDevisService {

  private apiUrl = `${environment.apiUrl}/demandeDevis`;
  private apiUrlDemandeDevisById = `${environment.apiUrl}/demandeDevis/getDemandeDevisById`;
  private apiUrlPieceDemandeDevisById = `${environment.apiUrl}/demandeDevis/ajoutPieceDemandeDevis`;
  private apiUrlEnvoieMail = `${environment.apiUrl}/demandeDevis/send-email1`;
  constructor(private http: HttpClient) { }

  getDemandeDevis(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addDemandeDevis(dateDemandeDevis: string, idVoitureClient: string, details: any): Observable<any> {
    const body = { dateDemandeDevis, idVoitureClient,details};
    return this.http.post(this.apiUrl, body);
  }

  getDemandeDevisById(idDemande: string): Observable<any> {
    return this.http.get(`${this.apiUrlDemandeDevisById}/${idDemande}`);
  }

  ajoutPieceDemandeDevis(heureFini: string, minuteFini: string, idDemandeDevis: string,details: any, noteVoiture: number, services: any): Observable<any> {
    const body = { heureFini, minuteFini,idDemandeDevis,details,noteVoiture,services};
    console.log("byeeeeee");
    console.log(body);
    return this.http.post(this.apiUrlPieceDemandeDevisById, body);
  }

  envoieMail(body: FormData): Observable<any> {
    return this.http.post(this.apiUrlEnvoieMail, body);
  }
}
