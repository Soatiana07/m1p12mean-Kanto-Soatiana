import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueVoitureService {

  private apiUrl = `${environment.apiUrl}/marqueVoiture`;
  constructor(private http: HttpClient) { }

  getMarque(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }



  addMarque(marque: string, note: string): Observable<any> {
    const body ={ marque,note};
    return this.http.post(this.apiUrl, body);
  }
}
