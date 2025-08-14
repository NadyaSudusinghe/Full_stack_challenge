import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ColorDto, ColorService } from '../../services/color.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-color-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './color-list.component.html',
  styleUrl: './color-list.component.scss'
})
export class ColorListComponent implements OnInit {
  colors: ColorDto[] = [];

  addForm!: FormGroup;
  editForm!: FormGroup;

  editingColorId: number | null = null;

  constructor(private cs: ColorService, private fb: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.loadColors();
  }

  loadColors() {
    this.cs.getAll().subscribe(c => {
      this.colors = c;
      this.cancelEdit();
    });
  }

  onAdd() {
    if (this.addForm.invalid) return;
    const payload = { name: this.addForm.value.name!.trim() };
    this.cs.create(payload).subscribe(() => {
      this.addForm.reset();
      this.loadColors();
    });
  }

  startEdit(color: ColorDto) {
    this.editingColorId = color.id;
    this.editForm.setValue({ name: color.name ?? '' });
  }

  cancelEdit() {
    this.editingColorId = null;
    this.editForm.reset();
  }

  saveEdit() {
    if (!this.editingColorId || this.editForm.invalid) return;
    const payload = { name: this.editForm.value.name!.trim() };
    this.cs.update(this.editingColorId, payload).subscribe(() => {
      this.loadColors();
    });
  }

  deleteColor(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this color?')) {
      this.cs.delete(id).subscribe({
        next: () => this.loadColors(),
        error: (err) => alert(err.message),
      });
    }
  }
}
