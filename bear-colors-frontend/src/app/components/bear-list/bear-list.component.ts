import { Component, OnInit } from '@angular/core';
import { BearService, BearDto } from '../../services/bear.service';
import { ColorService, ColorDto } from '../../services/color.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bear-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './bear-list.component.html',
  styleUrls: ['./bear-list.component.scss'],
})
export class BearListComponent {
  bears: BearDto[] = [];
  colors: ColorDto[] = [];
  filterColor = '';

  addForm!: ReturnType<FormBuilder['group']>;
  editForm!: ReturnType<FormBuilder['group']>;

  editingBearId: number | null = null;

  constructor(
    private bearService: BearService,
    private colorService: ColorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      size: [0, [Validators.required, Validators.min(1)]],
      colors: [[] as number[]],
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      size: [0, [Validators.required, Validators.min(1)]],
      colors: [[] as number[]],
    });

    this.colorService.getAll().subscribe((cs) => (this.colors = cs));
    this.loadBears();
  }

  loadBears() {
    this.bearService.getAll().subscribe((list) => {
      this.bears = list;
      this.cancelEdit();
    });
  }

  onFilterByColor() {
    if (!this.filterColor) return this.loadBears();
    this.bearService.getByColor(this.filterColor).subscribe((list) => {
      this.bears = list;
      this.cancelEdit();
    });
  }

  onSubmit() {
    if (this.addForm.invalid) return;
    const val = this.addForm.value;
    const payload = {
      name: val.name!,
      size: Number(val.size),
      colors: (val.colors || []).map((id: number) => ({ id })),
    };
    this.bearService.create(payload).subscribe(() => {
      this.addForm.reset({ name: '', size: 0, colors: [] });
      this.loadBears();
    });
  }

  startEdit(bear: BearDto) {
    this.editingBearId = bear.id ?? null;
    this.editForm.setValue({
      name: bear.name,
      size: bear.size,
      colors: (bear.colors ?? []).map((c) => c.id),
    });
  }

  cancelEdit() {
    this.editingBearId = null;
    this.editForm.reset({ name: '', size: 0, colors: [] });
  }

  saveEdit() {
    if (!this.editingBearId || this.editForm.invalid) return;

    const val = this.editForm.value;

    const selectedColors = (val.colors || []).map((id: number) => {
      const match = this.colors.find((c) => c.id === id);
      if (!match) throw new Error(`Color with ID ${id} not found`);
      return { id: match.id, name: match.name };
    });

    const payload = {
      name: val.name!,
      size: Number(val.size),
      // colors: this.selectedColors.map(c => ({ id: c.id, name: c.name }))
      colors: selectedColors,
      // colors: (val.colors || []).map((id: number) => ({ id }))
    };

    this.bearService.update(this.editingBearId, payload).subscribe(() => {
      this.loadBears();
    });
  }

  deleteBear(id?: number) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this bear?')) {
      this.bearService.delete(id).subscribe(() => {
        this.loadBears();
      });
    }
  }
}
