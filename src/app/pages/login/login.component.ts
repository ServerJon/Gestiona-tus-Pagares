import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    /**
     * Variables
     */
    public email = new FormControl('', [Validators.required, Validators.email]);
    public hide: boolean;

    constructor() {
        this.hide  = true;
    }

    ngOnInit() { }

    getErrorMessage() {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
    }
}