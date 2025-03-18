import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

 private apiUrl = `${environment.apiUrl}/pays`;
  constructor(private http: HttpClient) { }

  // searchPays(query: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}?q=${query}`);
  // }

  searchPays(query: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}?q=${query}`)
      .pipe(map((response) => response || []));
  }
}
