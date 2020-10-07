import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs';

/**
 * Login Service
 */
@Injectable({providedIn: 'root'})
export class LoginService {
    /**
     * Variables
     */
    private user: Observable<User | null>;

    constructor(private afsAuth: AngularFireAuth) {
        this.user = this.afsAuth.authState;
    }

    /**
     * Login with firebase
     * @param email User's email
     * @param password User's password
     */
    public async login(email: string, password: string): Promise<auth.UserCredential> {
        return await this.afsAuth.signInWithEmailAndPassword(email, password);
    }

    /**
     * Logout of firebase
     */
    public async logout() {
        await this.afsAuth.signOut();
    }

    /**
     * Get the user's authenticate state
     */
    public get authenticated(): boolean {
        return this.user != null;
    }

    /**
     * Get the user's information
     */
    public get currentUser(): Observable<User | null> {
        return this.user;
    }
}