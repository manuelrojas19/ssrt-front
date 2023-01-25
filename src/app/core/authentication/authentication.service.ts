import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Student } from '../models/student';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  status: string;
  token: String;
  user: String;
}

interface ValidateAuthenticationResponse {
  authenticated: boolean;
  jwt: String;
  user: string;
}

interface AuthenticationData {
  isAuthenticated: boolean;
  user: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authenticationData$ = new BehaviorSubject<AuthenticationData>({
    isAuthenticated: null,
    user: null,
  });

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  validateAuthentication() {
    return this.http
      .get<ValidateAuthenticationResponse>(`${this.apiUrl}/auth/validate`, {
        headers: new HttpHeaders({
          Authorization: Cookie.get('jwtToken'),
        }),
      })
      .pipe(
        tap(({ authenticated, jwt, user }) => {
          console.log(jwt);
          this.authenticationData$.next({
            isAuthenticated: authenticated,
            user: user,
          });
          Cookie.set('jwtToken', jwt.toString());
        })
      );
  }

  getCurrentUser() {
    return this.http.get<Student>(`${this.apiUrl}/auth/user`, {
      headers: new HttpHeaders({
        Authorization: Cookie.get('jwtToken'),
      }),
    });
  }

  login(credentials: LoginCredentials) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(({ token, user }) => {
          this.authenticationData$.next({
            isAuthenticated: true,
            user: user,
          });
          Cookie.set('jwtToken', token.toString());
        })
      );
  }

  signup(user: any) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/signup`, user);
  }

  signout() {
    this.authenticationData$.next({ isAuthenticated: false, user: null });
    Cookie.delete('jwtToken');
  }
}
