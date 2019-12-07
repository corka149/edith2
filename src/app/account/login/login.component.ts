import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  });
  authenticated = false;
  loginFailed = false;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * login
   */
  public async login() {
    this.subscriptions.add(this.authService.login(this.email.value, this.password.value)
    .subscribe(
      result => this.handleSuccessfulLogin(result)
    ));
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  private handleSuccessfulLogin(sucessful: boolean) {
    if (sucessful) {
      this.location.back();
    } else {
      this.authenticated = sucessful;
      this.loginFailed = !sucessful;
    }
  }
}
