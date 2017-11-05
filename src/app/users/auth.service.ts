import { Injectable } from '@angular/core';
import { IUser } from './user';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor() { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
