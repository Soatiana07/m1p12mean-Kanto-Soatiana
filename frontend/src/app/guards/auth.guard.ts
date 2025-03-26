import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginClientService } from '../services/Client/login-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginClientService: LoginClientService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> { // ✅ Correction : Utilisation de Promise<boolean>
    const token = localStorage.getItem('token'); // Récupère le token depuis localStorage
    const idClientConnecte = this.loginClientService.getIdClientByToken(token);

    if (!token) {
      this.router.navigate(['/loginClient']); // Si pas de token, rediriger vers login
      return false;
    }

    try {
      const isValid = await firstValueFrom(this.loginClientService.getValidTokens(idClientConnecte[0]?.idClient)); // ✅ Correction avec firstValueFrom()
      if (isValid) {
        return true; // L'utilisateur peut accéder à la page
      } else {
        this.router.navigate(['/loginClient']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['/loginClient']);
      return false;
    }
  }
}
