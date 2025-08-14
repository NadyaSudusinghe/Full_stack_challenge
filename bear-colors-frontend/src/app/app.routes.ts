import { Routes } from '@angular/router';
import { BearListComponent } from './components/bear-list/bear-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';

export const routes: Routes = [
  { path: '', component: BearListComponent },
  { path: 'colors', component: ColorListComponent },
  { path: '**', redirectTo: '' }
];
