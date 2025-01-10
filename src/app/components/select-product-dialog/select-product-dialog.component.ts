import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../services/products.service';

interface DialogData {
  products: Product[];
  selectedProductId: string;
}

@Component({
  selector: 'app-select-product-dialog',
  imports: [
    FormsModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './select-product-dialog.component.html',
  styleUrl: './select-product-dialog.component.scss'
})
export class SelectProductDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SelectProductDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  products = signal(this.data.products);
  selectedProductId = signal(this.data.selectedProductId);
  selectedProduct = computed(() => this.products().find(p => p.id === this.selectedProductId())!);
  total = computed(() => Number(this.quantity()) * (this.selectedProduct().price || 0));
  quantity = linkedSignal({
    source: this.selectedProductId,
    computation: () => '1'
  });

  close(): void {
    this.dialogRef.close();
  }

  add(): void {
    this.dialogRef.close({ product: this.selectedProduct(), quantity: Number(this.quantity()) });
  }
}


