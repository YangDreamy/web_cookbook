import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../datamodel/Recipe';
import { RecipeService } from 'src/app/service/recipe.service';
import { Category } from 'src/app/datamodel/Category';
import { DomSanitizer } from '@angular/platform-browser';
import { Nutrition } from 'src/app/datamodel/Nutrition';
import { Ingredient } from 'src/app/datamodel/Ingredient';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private _activitedRoute: ActivatedRoute, private recipeService: RecipeService, private sanitizer: DomSanitizer) { }

  recipe_id: Number | undefined;
  resRecipe: Recipe = new Recipe(0,"","",0,0,"","","",0,"","","");
  resCategory: Category[] = [];
  resRecRecipes: Recipe[] = [];
  resNutrition: Nutrition[] = [];
  resIngredient: Ingredient[] = [];

  ngOnInit(): void {
    // console.log(this._activitedRoute.snapshot.queryParams['recipe_id']);
    this.recipe_id = this._activitedRoute.snapshot.queryParams['recipe_id'];
    // this.recipe_id = 2;
    this.getRecipeById();
    if(this.recipe_id!=undefined){
      this.getNutritionbyRecipeId(this.recipe_id);
      this.getCategoryByRecipeId(this.recipe_id);
      this.getIngredientsByRecipeId(this.recipe_id);
    }
  }

  translateArrayBufferToBase64(buffer: any) {
    let binaryStr = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0, len = bytes.byteLength; i < len; i++) {
      binaryStr += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binaryStr);
  }

  getRecipeById() {
    if (this.recipe_id == undefined) return;
    this.recipeService.getRecipeById(this.recipe_id).subscribe((data) => {
      // console.log(data)
      for (let ele of data) {
        if (ele.main_image == null) continue;
        const arrayBuffer = new Uint8Array(ele.main_image.data)
        var bufferBase64 = this.translateArrayBufferToBase64(arrayBuffer);
        // console.log(bufferBase64)
        ele.main_image = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + bufferBase64)
      }
      this.resRecipe = data[0];
      this.getRecommendedRecipe(this.resRecipe.recipe_id);
    });
  }

  getRecommendedRecipe(recipe_id: Number) {
    // console.log("!!!!");
    console.log(recipe_id);
    this.recipeService.getRecommendedRecipe(recipe_id).subscribe((data) => {
      console.log(data)
      for (let ele of data) {
        if (ele.main_image == null) continue;
        const arrayBuffer = new Uint8Array(ele.main_image.data)
        var bufferBase64 = this.translateArrayBufferToBase64(arrayBuffer);
        // console.log(bufferBase64)
        ele.main_image = this.sanitizer.bypassSecurityTrustUrl("data:image/jpg;base64," + bufferBase64)
      }
      this.resRecRecipes = data;
    });
  }

  getNutritionbyRecipeId(recipe_id: Number) {
    // console.log("!!!!");
    this.recipeService.getNutritionbyRecipeId(recipe_id).subscribe((data) => {
      // console.log(data)
      this.resNutrition = data;
    });
  }
  
  getCategoryByRecipeId(recipe_id: Number) {
    // console.log("!!!!");
    this.recipeService.getCategoryByRecipeId(recipe_id).subscribe((data) => {
      // console.log(data)
      this.resCategory = data;
    });
  }

  addRecipeToMealCart(recipe_id: Number) {
    console.log("!!!!");
    this.recipeService.addRecipeToMealCart(recipe_id).subscribe();
  }

  getIngredientsByRecipeId(recipe_id: Number) {
    // console.log("!!!!");
    this.recipeService.getIngredientsByRecipeId(recipe_id).subscribe((data) => {
      // console.log(data)
      this.resIngredient = data;
    });
  }

  addrecipe() {
    Swal.fire({
      title: 'Do you want to add to your shoppinglist?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `yes`,
      confirmButtonColor: `coral`,
      denyButtonText: `no`,
      denyButtonColor: `rgb(238, 205, 148)`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        //保存
        if (this.recipe_id==undefined)return;
        this.addRecipeToMealCart(this.recipe_id);
        Swal.fire('Good choice !', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Let me see...', '', 'info')
      }
    })
  }
}
