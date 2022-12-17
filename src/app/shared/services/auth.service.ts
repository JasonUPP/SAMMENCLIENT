import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { LoginResponse } from 'src/app/Models/loginResponse';
import { User } from 'src/app/Models/user';
import {environment} from '../../../environments/environment'

export interface IUser {
  email: string;
  avatarUrl?: string
}

const defaultPath = '/';
const baseurl = environment.apiURL + 'api/auth/'

const httpOption = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {
  private _user: any;
  private userSubject: BehaviorSubject<any>;
  private tokenSubject: BehaviorSubject<string>;

  get loggedIn(): boolean {
    return !!this.userSubject.value;
  }

  get userLogged():User {
    return this.userSubject.value;
  }

  get token() {
    return this.tokenSubject.value;
  }
  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('user') ?? 'null'))//?? when its null
    this.tokenSubject = new BehaviorSubject<string>('');
   }

  logIn(email: string, password: string): Observable<any>  {
    return this.http.post<LoginResponse>(`${baseurl}Login`, { email, password}, httpOption)
    .pipe(
      map(res => {
        const user: User = res.user;
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.tokenSubject.next(res.token);
      }),
      catchError(this.handleError)
    )
  }

  logOut(){
    sessionStorage.removeItem('user');    
    this.userSubject.next(null);
    this.router.navigate(['/login-form']);

  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  async getUser() {
    try {     
      return {
        isOk: true,
        data: this.userSubject.value
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }
}
