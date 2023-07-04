import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []
  constructor( private categoriesServices: CategoriesService ) { }

  ngOnInit(): void {
    this.categoriesServices.getAllCategories()
      .subscribe(value => {
        this.categories = value
      })
  }

}
