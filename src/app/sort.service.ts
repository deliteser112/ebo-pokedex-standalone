// sort.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  private sortOptionSource = new BehaviorSubject<string>('default');
  sortOption$ = this.sortOptionSource.asObservable();

  setSortOption(option: string) {
    this.sortOptionSource.next(option);
  }

  getSortOption(): string {
    return this.sortOptionSource.getValue();
  }
}
