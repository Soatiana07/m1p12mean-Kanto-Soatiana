import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginManagerService } from '../services/login-manager.service';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthManagerGuard implements CanActivate {
  constructor(private loginManagerService: LoginManagerService, private router: Router) {}

  canActivate(): Observable<boolean> {return this.loginManagerService.verifyToken().pipe(
          map((connecte) => {
              console.log('Connecte ato manager : ', connecte);

              if (connecte === 0) {
                  return true;
              } else {
                  this.router.navigate(['/loginManager']/*, { queryParams: { session: 'expired' } }*/);
                  return false;
              }
          }),
          catchError((error) => {
              console.error('Erreur:', error);
              this.router.navigate(['/loginManager']/*, { queryParams: { session: 'expired' } }*/);
              return of(false);
          })
      );
  }
}
