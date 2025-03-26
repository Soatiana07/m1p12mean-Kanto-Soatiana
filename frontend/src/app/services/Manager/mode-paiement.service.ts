import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModePaiementService {
   private apiUrl = `${environment.apiUrl}/modePaiement`;
  constructor(private http: HttpClient) { }

   getModePaiement(): Observable<any> {
      return this.http.get(this.apiUrl);
    }

    addModePaiement(nomMode: string): Observable<any> {
      const body ={ nomMode};
      return this.http.post(this.apiUrl, body);
    }
}
