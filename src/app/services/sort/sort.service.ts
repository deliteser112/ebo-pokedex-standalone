import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  private sortOptionSubject = new BehaviorSubject<string>('default');
  sortOption$ = this.sortOptionSubject.asObservable();

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  setSortOption(option: string) {
    this.sortOptionSubject.next(option);
  }

  getSortOption(): string {
    return this.sortOptionSubject.getValue();
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.getValue();
  }
}
