import { computed, Injectable, signal } from '@angular/core';
import { Product } from './products.service';

export interface CartItem {
  product: Product,
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsState = signal<CartItem[]>([]);
  cartItems = computed(() => this.cartItemsState());
  totalItems = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));

  addToCart(cartItem: CartItem) {
    const { product, quantity } = cartItem;
    const items = this.cartItems();
    const itemIndex = items.findIndex(item => item.product.name === product.name);
    if (itemIndex < 0) {
      items.push({ product, quantity });
    } else {
      items[itemIndex].quantity += quantity;
    }

    this.cartItemsState.set([...items]);
  }

  removeFromCart(id: string) {
    const items = this.cartItems();
    const itemIndex = items.findIndex(item => item.product.id === id);
    if (itemIndex >= 0) {
      items.splice(itemIndex, 1);
    }

    this.cartItemsState.set([...items]);
  }
}
