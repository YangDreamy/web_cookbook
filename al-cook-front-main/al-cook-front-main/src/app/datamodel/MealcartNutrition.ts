export class MealcartNutrition{
    nutrition_id: Number;
    amount: Number;
    nutrition_name: String

    constructor(nutrition_id: Number, amount: Number, nutrition_name: String){
        this.nutrition_id = nutrition_id;
        this.amount = amount;
        this.nutrition_name = nutrition_name;
    }
}