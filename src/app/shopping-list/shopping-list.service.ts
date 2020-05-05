import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../recipes/recipe.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addNewIngredient(newIngredient: Ingredient) {
   this.ingredients.push(newIngredient);
  //  this.getIngredients(); // si tiene el slice no funciona porque el slice es una copia del array original
   this.ingredientsChanged.next(this.ingredients.slice());
  }

  setRecipe(recipe: Recipe) {
    this.ingredients = recipe.ingredients;
  }


}
