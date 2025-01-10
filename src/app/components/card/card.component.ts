import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../services/products.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [MatButtonModule, MatCardModule, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  product = input.required<Product>();
  label = input('MORE');
  select = output<void>();

  handleSelect() {
    this.select.emit();
  }
}
