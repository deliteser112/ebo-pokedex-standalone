import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sortOption: string = 'default';

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOption = selectElement.value;
  }
}
