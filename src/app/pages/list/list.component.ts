import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/servie/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products$: Observable<Product[]> = this.productService.getAll();

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  onDelete(product: Product): void {
    if (window.confirm('Delete this quiz?')) {
      this.productService.remove(product).subscribe(
        () => this.products$ = this.productService.getAll()
      )
    }
  }

}
