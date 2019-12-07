import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { AuthenticationService } from 'src/app/account/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy, OnDestroy {
  mobileQuery: MediaQueryList;
  authService: AuthenticationService;

  private mobileQueryListener: () => void;
  private subscribtions =  new Subscription();

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, authService: AuthenticationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.authService = authService;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnDestory(): void {
    this.subscribtions.unsubscribe();
  }

  public logout() {
    this.subscribtions.add(this.authService.logout().subscribe(
      successful => {
        if (successful) {
          window.location.reload();
        }
      }
    ));
  }
}
