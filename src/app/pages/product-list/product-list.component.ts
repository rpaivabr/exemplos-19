import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { CardComponent } from '../../components/card/card.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectProductDialogComponent } from '../../components/select-product-dialog/select-product-dialog.component';

@Component({
  selector: 'app-product-list',
  imports: [CardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private cartService = inject(CartService);
  private productsService = inject(ProductsService);
  private dialog = inject(MatDialog);

  productsResource = rxResource({
    loader: () => this.productsService.getProducts()
  });
  products = computed(() => this.productsResource.value() ?? []);
  isLoading = computed(() => this.productsResource.isLoading());
  error = computed(() => this.productsResource.error());

  openDialog(id: string) {
    const dialogRef = this.dialog.open(SelectProductDialogComponent, {
      data: { products: this.products(), selectedProductId: id }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { product, quantity } = result;
        this.cartService.addToCart({ product, quantity });
      }
    })
  } 
}
