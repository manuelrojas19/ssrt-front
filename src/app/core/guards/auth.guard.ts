import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, skipWhile, take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authenticationService.authenticationData$.pipe(
      skipWhile((value) => value.isAuthenticated === null),
      take(1),
      map(({ isAuthenticated }) => {
        if (!isAuthenticated) {
          return true;
        }
        this.router.navigateByUrl('/alumnos/home');
        return false;
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authenticationService.authenticationData$.pipe(
      skipWhile((value) => value.isAuthenticated === null),
      take(1),
      map(({ isAuthenticated }) => {
        if (isAuthenticated) {
          return true;
        }
        console.log('User is not authenticated');
        this.router.navigateByUrl('/');
        return false;
      })
    );
  }
}
