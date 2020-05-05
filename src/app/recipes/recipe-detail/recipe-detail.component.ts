import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
/*   @Input() recipeDetails: Recipe;
 */
   recipeDetails: Recipe;
   id: number;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router) { }

  ngOnInit() {
    // this.id = +this.route.snapshot.params.id; // Este no se usa porque no cambia al seleccionar otro recipe
    this.route.params.subscribe((params: Params) => { // Esto reacciona a cualquier cambio que se realice
      if (params) {
        this.id = +params.id;
        this.recipeDetails = this.recipeService.getSelectedRecipe(this.id);
      }
    });
    // console.log(this.recipeService.getSelectedRecipe(id));
    this.recipeDetails = this.recipeService.getSelectedRecipe(this.id);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
