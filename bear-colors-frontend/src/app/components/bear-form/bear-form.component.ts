import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { BearService } from '../../services/bear.service';
import { ColorService } from '../../services/color.service';
import { Bear } from '../../models/bear.model';
import { Color } from '../../models/color.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bear-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h4>{{ bear.id === 0 ? 'Create Bear' : 'Edit Bear' }}</h4>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>
        Name:
        <input formControlName="name" />
      </label>
      <br />
      <label>
        Size:
        <input type="number" formControlName="size" />
      </label>
      <br />
      <label>
        Colors:
        <select
          formControlName="colors"
          multiple
          size="5"
          style="width: 200px;"
        >
          <option *ngFor="let color of allColors" [value]="color.id">
            {{ color.name }}
          </option>
        </select>
      </label>
      <br /><br />
      <button type="submit" [disabled]="form.invalid">
        {{ bear.id === 0 ? 'Create' : 'Update' }}
      </button>
      <button type="button" (click)="cancel.emit()">Cancel</button>
    </form>
  `,
})
export class BearFormComponent implements OnInit {
  @Input() bear!: Bear;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private bearService = inject(BearService);
  private colorService = inject(ColorService);
  private fb = inject(FormBuilder);

  allColors: Color[] = [];
  form!: FormGroup;

  ngOnInit() {
    // this.colorService.getAllColors().subscribe((colors) => {
    //   this.allColors = colors;
    //   this.initForm();
    // });
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.bear.name, Validators.required],
      size: [this.bear.size, [Validators.required, Validators.min(0)]],
      colors: [
        this.bear.colors?.map((c) => c.id) || [],
        Validators.required,
      ],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const bearToSave: Partial<Bear> = {
      name: formValue.name,
      size: formValue.size,
      colors: formValue.colors.map(
        (colorId: number) => this.allColors.find((c) => c.id === colorId)!
      ),
    };

    // if (this.bear.id === 0) {
    //   this.bearService.createBear(bearToSave).subscribe(() => this.saved.emit());
    // } else {
    //   this.bearService
    //     .updateBear(this.bear.id, bearToSave)
    //     .subscribe(() => this.saved.emit());
    // }
  }
}
