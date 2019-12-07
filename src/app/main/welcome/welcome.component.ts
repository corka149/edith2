import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/account/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  name = '';

  private subscribtions = new Subscription();

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.subscribtions.add(this.authService.getUserDetails().subscribe(
      user => this.name = user.name
    ));
  }

  ngOnDestroy() {
    this.subscribtions.unsubscribe();
  }

}
