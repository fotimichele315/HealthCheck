import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, of, switchMap, startWith , tap} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "HealthCheck";

  constructor(private http: HttpClient) { }

  /**
   * Controlla se c'è accesso a Internet ogni 5 secondi
   */
  public online$: Observable<boolean> = interval(5000).pipe(
    startWith(0), // controllo subito appena parte l'app
    switchMap(() =>
      this.http.get('https://api.ipify.org', { responseType: 'text' }).pipe(
     // this.http.get('https://localhost:40443/api/hearthbeat', { responseType: 'text' }).pipe(
        switchMap(() => of(true)),   // richiesta OK → online
        catchError(() => of(false))  // richiesta fallita → offline
      )
    ),
    tap(isOnline => console.log('Online status:', isOnline)) // log per debug
  );
}
