import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { User, auth } from 'firebase';
import { Observable, of } from 'rxjs';

/**
 * Login Service
 */
@Injectable({providedIn: 'root'})
export class LoginService {
    /**
     * Variables
     */
    // private user: Observable<User | null>;

    // constructor(private afsAuth: AngularFireAuth) {
    //     this.user = this.afsAuth.authState;
    // }

    constructor() {}

    /**
     * Login with firebase
     * @param email User's email
     * @param password User's password
     */
    public async login(email: string, password: string) {
        // return await this.afsAuth.signInWithEmailAndPassword(email, password);

        return of(true);
    }

    /**
     * Logout of firebase
     */
    public async logout() {
        // await this.afsAuth.signOut();

        return of(true);
    }

    /**
     * Get the user's authenticate state
     */
    public get authenticated(): boolean {
      return true;
        // return this.user != null;
    }

    /**
     * Get the user's information
     */
    // public get currentUser(): Observable<User | null> {
    //     return this.user;
    // }
    public get currentUser() {
      return of(true);
    }
}
