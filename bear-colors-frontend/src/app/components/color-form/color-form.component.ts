import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../services/color.service';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-color-list',
  providers:[MatToolbar],
  template: `
  <mat-toolbar color="primary"><span>Colors</span></mat-toolbar>
  <div class="container">
    <!-- <mat-card>
      <h2>Available Colors</h2>
      <mat-list>
        <mat-list-item *ngFor="let c of colors">
          {{ c.name }}
        </mat-list-item>
      </mat-list>
    </mat-card> -->
  </div>`,
  styles:[`.container { padding: 16px; }`],
  imports: [MatToolbar]
})
export class ColorListComponent implements OnInit {
  colors: any[] = [];
  constructor(private cs: ColorService) {}
  ngOnInit(){ this.cs.getAll().subscribe(c=>this.colors=c); }
}
