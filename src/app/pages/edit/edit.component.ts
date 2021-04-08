import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/servie/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Product());
      }
      return this.productService.get(params.id)
    })
  )

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, product: Product): void {
    if (!product.id) {
      // this.productService.create(product)
      // this.router.navigate([''])
      //console.log('1',product)

      this.productService.create(product).subscribe(
        product => {
          // console.log('b',product)
          this.router.navigate([''])
        })

    } else {
      this.productService.update(product).subscribe(
        () => this.router.navigate([''])
      )
    }
  }

}
