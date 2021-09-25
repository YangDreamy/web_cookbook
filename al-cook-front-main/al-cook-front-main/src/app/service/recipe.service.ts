import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../datamodel/Recipe';
import { Category } from '../datamodel/Category';
import { Nutrition } from '../datamodel/Nutrition';
import { Ingredient } from '../datamodel/Ingredient';
import { MealCart } from '../datamodel/Mealcart';
import { MealcartNutrition } from '../datamodel/MealcartNutrition';
import { Calorie } from '../datamodel/Calorie';
import { MealcartIngredient } from '../datamodel/MealcartIngredient';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url : string = "http://localhost:3000/api";

  constructor(private httpClient : HttpClient) { }

  getAllRecipes(): Observable<Recipe[]>{
    return this.httpClient.get(this.url+"/getAllRecipes") as Observable<Recipe[]>;
  }

  getRecipesByName(recipe_name:String): Observable<Recipe[]>{
    const body = {recipe_name: recipe_name};
    return this.httpClient.post(this.url+"/getRecipesByName",body) as Observable<Recipe[]>;
  }

  getAllCategories(): Observable<Category[]>{
    return this.httpClient.get(this.url+"/getAllCategories") as Observable<Category[]>;
  }

  getRecipesByCategory(category_id:Number): Observable<Recipe[]>{
    const body = {category_id: category_id};
    return this.httpClient.post(this.url+"/getRecipesByCategory",body) as Observable<Recipe[]>;
  }

  getRecommendedRecipe(recipe_id:Number): Observable<Recipe[]>{
    const body = {recipe_id: recipe_id};
    return this.httpClient.post(this.url+"/getRecommendedRecipe",body) as Observable<Recipe[]>;
  }

  getRecipeById(recipe_id:Number): Observable<Recipe[]>{
    const body = {recipe_id: recipe_id};
    return this.httpClient.post(this.url+"/getRecipeById",body) as Observable<Recipe[]>;
  }

  getNutritionbyRecipeId(recipe_id:Number): Observable<Nutrition[]>{
    const body = {recipe_id: recipe_id};
    return this.httpClient.post(this.url+"/getNutritionbyRecipeId",body) as Observable<Nutrition[]>;
  }

  getCategoryByRecipeId(recipe_id:Number): Observable<Category[]>{
    const body = {recipe_id: recipe_id};
    return this.httpClient.post(this.url+"/getCategoryByRecipeId",body) as Observable<Category[]>;
  }

  addRecipeToMealCart(recipe_id:Number): Observable<any>{
    const body = {recipe_id: recipe_id};
    console.log(recipe_id);
    return this.httpClient.post(this.url+"/addRecipeToMealCart",body);
  }

  getIngredientsByRecipeId(recipe_id:Number): Observable<Ingredient[]>{
    const body = {recipe_id: recipe_id};
    console.log(recipe_id);
    return this.httpClient.post(this.url+"/getIngredientsByRecipeId",body) as Observable<Ingredient[]>;
  }

  getMealCartById(category_id:Number): Observable<MealCart[]>{
    const body = {category_id: category_id};
    console.log(category_id);
    return this.httpClient.post(this.url+"/getMealCartById",body) as Observable<MealCart[]>;
  }

  deleteRecipeFromMealCart(recipe_id:Number): Observable<any>{
    const body = {recipe_id: recipe_id};
    console.log(recipe_id);
    return this.httpClient.post(this.url+"/deleteRecipeFromMealCart",body);
  }

  getNutritionByMealCart(): Observable<MealcartNutrition[]>{
    return this.httpClient.get(this.url+"/getNutritionByMealCart") as Observable<MealcartNutrition[]>;
  }

  getCalorieByMealCart(): Observable<Calorie[]>{
    return this.httpClient.get(this.url+"/getCalorieByMealCart") as Observable<Calorie[]>;
  }

  getIngredientsByMealCart(): Observable<MealcartIngredient[]>{
    return this.httpClient.get(this.url+"/getIngredientsByMealCart") as Observable<MealcartIngredient[]>;
  }
}
