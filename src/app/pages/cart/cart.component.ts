import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-cart',
  imports: [CardComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);
  products = computed(() => this.cartService.cartItems().map(item => item.product));

  handleRemove(id: string) {
    this.cartService.removeFromCart(id);
  }
}
