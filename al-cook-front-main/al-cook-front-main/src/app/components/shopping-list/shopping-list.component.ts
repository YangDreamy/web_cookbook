import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Recipe } from '../../datamodel/Recipe';
import { RecipeService } from 'src/app/service/recipe.service';
import { Category } from 'src/app/datamodel/Category';
import { DomSanitizer } from '@angular/platform-browser';
import { Nutrition } from 'src/app/datamodel/Nutrition';
import { Ingredient } from 'src/app/datamodel/Ingredient';
import { MealCart } from 'src/app/datamodel/Mealcart';
import { MealcartNutrition } from 'src/app/datamodel/MealcartNutrition';
import { Calorie } from 'src/app/datamodel/Calorie';
import { MealcartIngredient } from 'src/app/datamodel/MealcartIngredient';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent {
  constructor(private recipeService: RecipeService, private sanitizer: DomSanitizer) { }

  resCategory: Category[] = [];
  resRecRecipes: Recipe[] = [];
  resNutrition: Nutrition[] = [];
  resIngredient: Ingredient[] = [];
  resMealCart: MealCart[] = [];
  resMealcartNutrition: MealcartNutrition[] = [];
  resCalorie: Calorie[] = [new Calorie(0)];
  resMCIngredient: MealcartIngredient[] = [new MealcartIngredient(0,"")];

  ngOnInit(): void {
    
    this.getMealCartById(1);
    this.getNutritionByMealCart();
    this.getCalorieByMealCart();
    this.getIngredientsByMealCart();
  }

  translateArrayBufferToBase64(buffer: any) {
    let binaryStr = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0, len = bytes.byteLength; i < len; i++) {
      binaryStr += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binaryStr);
  }

  getMealCartById(category_id: Number) {
    // console.log("!!!!");
    this.recipeService.getMealCartById(category_id).subscribe((data) => {
      // console.log(data)
      console.log(data)
      for (let ele of data) {
        if (ele.main_image == null) continue;
        const arrayBuffer = new Uint8Array(ele.main_image.data)
        var bufferBase64 = this.translateArrayBufferToBase64(arrayBuffer);
        // console.log(bufferBase64)
        ele.main_image = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + bufferBase64)
      }
      this.resMealCart = data;
      console.log("!!!")
    });
  }

  deleteRecipeFromMealCart(recipe_id: Number) {
    // console.log("!!!!");
    this.recipeService.deleteRecipeFromMealCart(recipe_id).subscribe();
  }

  deleterecipe(recipe_id:Number){
    Swal.fire({
      title: 'Do you want to delete this recipe form your meal cart?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `yes`,
      confirmButtonColor: `coral`,
      denyButtonText: `no`,
      denyButtonColor: `rgb(238, 205, 148)`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteRecipeFromMealCart(recipe_id);
        
        this.getMealCartById(1);
        Swal.fire('Done', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Let me think about it', '', 'info')
      }
    })
  }

  getNutritionByMealCart() {
    // console.log("!!!!");
    this.recipeService.getNutritionByMealCart().subscribe((data) => {
      // console.log(data)
      this.resMealcartNutrition = data;
    });
  }

  getCalorieByMealCart() {
    // console.log("!!!!");
    this.recipeService.getCalorieByMealCart().subscribe((data) => {
      // console.log(data)
      this.resCalorie = data;
    });
  }

  
  getIngredientsByMealCart() {
    // console.log("!!!!");
    this.recipeService.getIngredientsByMealCart().subscribe((data) => {
      // console.log(data)
      this.resMCIngredient = data;
    });
  }

}
