export class Ingredient{
    ingredient_id: Number;
    ingredient_name: String;
    calorie_per_100g: Number;
    ingredient_image: any;
    quantity_g: Number;

    constructor(ingredient_id: Number, ingredient_name: String, calorie_per_100g: Number, ingredient_image: any, quantity_g: Number){
        this.ingredient_id = ingredient_id,
        this.ingredient_name = ingredient_name,
        this.calorie_per_100g = calorie_per_100g,
        this.ingredient_image = ingredient_image,
        this.quantity_g = quantity_g
    }
}