import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SortService } from '../sort.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  sortOption: string = 'default';
  searchQuery: string = '';

  constructor(private sortService: SortService, private router: Router) { }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOption = selectElement.value;
    this.sortService.setSortOption(this.sortOption);
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();
    this.sortService.setSearchQuery(this.searchQuery);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
