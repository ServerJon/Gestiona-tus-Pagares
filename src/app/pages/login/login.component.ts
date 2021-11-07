import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../shared/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
	/**
	 * Variables
	 */
	public loginForm: FormGroup;
	public emailRegx =
		/^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
	public hide: boolean;
	public errorLogin: boolean;

	constructor(
		private formBuilder: FormBuilder,
		private loginService: LoginService,
		private router: Router
	) {
		this.hide = true;
	}

	public ngOnInit(): void {
		this.errorLogin = false;

		this.loginForm = this.formBuilder.group({
			email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
			password: [null, [Validators.required, Validators.minLength(6)]]
		});
	}

	/**
	 * Login query
	 */
	public onSubmit(): void {
		if (this.loginForm.valid) {
			this.loginService
				.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
				.then((response) => {
					console.log('Login correcto', response);

					this.router.navigate(['/dasboard']);
				})
				.catch((error) => {
					console.error('Error al realizar el login:', error);

					this.errorLogin = true;

					setTimeout(() => {
						this.errorLogin = false;
					}, 5000);
				});
		}
	}
}
