export class Nutrition{
    recipe_id: Number;
    ingredient_id: Number;
    quantity_g: Number;
    nutrition_id: Number;
    amount_per_100g: Number;
    nutrition_name: String

    constructor(recipe_id: Number, ingredient_id: Number, quantity_g: Number, nutrition_id: Number, amount_per_100g: Number, nutrition_name: String){
        this.recipe_id = recipe_id;
        this.ingredient_id = ingredient_id;
        this.quantity_g = quantity_g;
        this.nutrition_id = nutrition_id;
        this.amount_per_100g = amount_per_100g;
        this.nutrition_name = nutrition_name;
    }
}