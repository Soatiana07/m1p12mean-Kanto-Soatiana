import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginClientService{

  private apiUrl = `${environment.apiUrl}/client`;

  constructor(private http: HttpClient) {}

  // Login
  login(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, mdp });
  }

  // Vérifier le token
  checkToken(tokenClient: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/checkToken`, { params: { tokenClient } });
  }

  // Déconnexion
  logout(tokenClient: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, { tokenClient });
  }

  // Récupérer les tokens valides
  getValidTokens(idClient: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/validTokens`, { params: { idClient } });
  }

  // Mettre invalide les anciens tokens
  unvalidOldToken(idClient: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unvalidOldToken`, { idClient });
  }

  // Get idclient by token 
  getIdClientByToken(tokenClient: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${tokenClient}`);
  }
}
