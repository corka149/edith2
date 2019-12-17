import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


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
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * login
   */
  public login() {
    this.subscriptions.add(this.authService.login(this.email.value, this.password.value)
    .subscribe(
      result => this.handleSuccessfulLogin(result)
    ));
  }

  /**
   * loginGithub
   */
  public loginGithub() {
    setTimeout(
      () => this.probeAuthentication(),
      2_500
    );
    window.location.replace('/jarvis/auth/github');
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

  private async probeAuthentication() {
    console.log('Probe authentication');
    this.router.navigateByUrl('/');
  }
}
