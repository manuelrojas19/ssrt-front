import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthenticationService } from './core/authentication/authentication.service';
import { LoaderService } from './core/services/loader.service';

interface AuthenticationData {
  isAuthenticated: boolean;
  user: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public authenticationData$: BehaviorSubject<AuthenticationData>;

  isLoading: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private loaderService: LoaderService
  ) {
    this.authenticationData$ = this.authService.authenticationData$;
  }

  ngOnInit() {
    this.listenToLoading();
    this.listenValidateAuthentication();
  }

  listenValidateAuthentication(): void {
    this.authService.validateAuthentication().subscribe({
      next: () => {},
      error: (err) => {
        Cookie.delete('jwtToken');
        this.authenticationData$.next({
          isAuthenticated: false,
          user: null,
        });
      },
    });
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this.loaderService.isLoading$
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }
}
