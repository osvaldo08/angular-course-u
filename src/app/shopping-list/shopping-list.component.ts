import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsSub: Subscription;
  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    // Esto solo se utiliza si se agrega el eventEmitter en el servicio
    this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy() {
    this.ingredientsSub.unsubscribe();
  }
}
