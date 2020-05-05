import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  constructor(private shoppingListservice: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(name, amount) { // view child se quitan parametros
    const newIngredient = new Ingredient(name.value, amount.value);
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredientAdded.emit(newIngredient);
    this.shoppingListservice.addNewIngredient(newIngredient);

    // console.log('nameInput: ', this.nameInputRef.nativeElement.value);
    // console.log('amountInput: ', this.amountInputRef.nativeElement.value);
  }

}
