import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/account/services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  authService: AuthenticationService;
  router: Router;

  private mobileQueryListener: () => void;
  private subscribtions =  new Subscription();

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, authService: AuthenticationService,
              router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
    this.subscribtions.add(
      this.authService.getUserDetails().subscribe()
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.subscribtions.unsubscribe();
  }

  public logout() {
    this.subscribtions.add(this.authService.logout().subscribe(
      successful => {
        if (successful) {
          window.location.replace('/');        }
      }
    ));
  }
}
