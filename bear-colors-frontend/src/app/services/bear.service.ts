// bear.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ColorDto {
  id: number;
  name: string;
}
export interface BearDto {
  id?: number;
  name: string;
  size: number;
  colors?: ColorDto[];
}

@Injectable({ providedIn: 'root' })
export class BearService {
  private prefix = '/api/bear';
  constructor(private http: HttpClient) {}

  getAll(): Observable<BearDto[]> {
    return this.http.get<BearDto[]>(this.prefix);
  }

  getByColor(colorName: string): Observable<BearDto[]> {
    return this.http.get<BearDto[]>(
      `${this.prefix}/colors/${encodeURIComponent(colorName)}`
    );
  }

  getById(id: number): Observable<BearDto> {
    return this.http.get<BearDto>(`${this.prefix}/${id}`);
  }

  create(bear: Partial<BearDto>): Observable<BearDto> {
    return this.http.post<BearDto>(this.prefix, bear);
  }

  update(id: number, bear: Partial<BearDto>): Observable<BearDto> {
    return this.http.put<BearDto>(`${this.prefix}/${id}`, bear);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/${id}`);
  }
}
