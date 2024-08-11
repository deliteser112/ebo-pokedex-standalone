// src/app/sort.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  private sortOptionSubject = new BehaviorSubject<string>('default');
  sortOption$ = this.sortOptionSubject.asObservable();

  setSortOption(option: string): void {
    this.sortOptionSubject.next(option);
  }
}
