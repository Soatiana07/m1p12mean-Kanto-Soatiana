import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginMecanicienService } from '../services/login-mecanicien.service';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthMecanicienGuard implements CanActivate {
  constructor(private loginMecanicienService: LoginMecanicienService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.loginMecanicienService.verifyToken().pipe(
      map((connecte) => {
        if (connecte === 0) return true;
        this.router.navigate(['/loginMecanicien']/*, { queryParams: { session: 'expired' } }*/);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/loginMecanicien']/*, { queryParams: { session: 'expired' } }*/);
        return of(false);
      })
    );
  }
}
