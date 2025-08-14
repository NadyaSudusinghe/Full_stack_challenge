import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Bear Colors</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/">Bears</a>
      <a mat-button routerLink="/colors">Colors</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`.spacer { flex: 1 1 auto; }`]
})
export class AppComponent {}
