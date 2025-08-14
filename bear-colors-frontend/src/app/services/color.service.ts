// color.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ColorDto {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ColorService {
  private prefix = '/api/color';
  constructor(private http: HttpClient) {}

  getAll(): Observable<ColorDto[]> {
    return this.http.get<ColorDto[]>(this.prefix);
  }

  getById(id: number): Observable<ColorDto> {
    return this.http.get<ColorDto>(`${this.prefix}/${id}`);
  }

  create(color: Partial<ColorDto>): Observable<ColorDto> {
    return this.http.post<ColorDto>(this.prefix, color);
  }

  update(id: number, color: Partial<ColorDto>): Observable<ColorDto> {
    return this.http.put<ColorDto>(`${this.prefix}/${id}`, color);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/${id}`);
  }
}
