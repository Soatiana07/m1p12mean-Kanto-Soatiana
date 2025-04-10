import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginClientService{

  private apiUrl = `${environment.apiUrl}/client`;
  private apiUrlAuth = `${environment.apiUrl}/auth/checkToken`;


  constructor(private http: HttpClient, private router : Router) {}

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
    return this.http.post<any>(`${this.apiUrl}/logout`, { params: { tokenClient } });
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

  verifyToken(): Observable<number> {
    const token = localStorage.getItem('token');

    // Tsisy token
    if (!token) {
        return of(1);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrlAuth, { headers, observe: 'response' }).pipe(
        map((response) => {
            console.log("Responseeeee :", response);
            return 0;
        }),
        catchError((error: HttpErrorResponse) => {
            console.error('Erreur de vérification du token:', error);
            localStorage.removeItem('token');
            this.router.navigate(['/loginClient']/*, { queryParams: { session: 'expired' } }*/);
            return of(1);

        })
    );
}
}
