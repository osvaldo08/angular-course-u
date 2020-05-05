import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
  @ViewChild('f', {static: true}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListservice: ShoppingListService) { }

  ngOnInit() {
    this.subscription = 
    this.shoppingListservice.starterEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListservice.getIngredient(this.editedItemIndex);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) { // view child se quitan parametros
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode) {
      this.shoppingListservice.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListservice.addNewIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

    // console.log('nameInput: ', this.nameInputRef.nativeElement.value);
    // console.log('amountInput: ', this.amountInputRef.nativeElement.value);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListservice.deleteItem(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
