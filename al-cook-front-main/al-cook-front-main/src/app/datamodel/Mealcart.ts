export class MealCart{
    meal_cart_id: Number;
    recipe_id: Number;
    recipe_name: String;
    recipe_description: String;
    prep_time: Number;
    cook_time: Number;
    recipe_subtitle: String;
    main_image: any;
    sub_image: any;
    calorie_per_100g: Number;
    create_time: any;
    update_time: any

    constructor( meal_cart_id: Number, recipe_id: Number, recipe_name: String, recipe_description: String, prep_time: Number, cook_time: Number,
         recipe_subtitle: String, main_image: any, sub_image: any, calorie_per_100g: Number, create_time: any, update_time: any){
            this.meal_cart_id = meal_cart_id;
            this.recipe_id = recipe_id;
            this.recipe_name = recipe_name;
            this.recipe_description = recipe_description;
            this.prep_time = prep_time;
            this.cook_time = cook_time;
            this.recipe_subtitle = recipe_subtitle;
            this.main_image = main_image;
            this.sub_image = sub_image;
            this.calorie_per_100g = calorie_per_100g;
            this.create_time = create_time;
            this.update_time = update_time;
        }
    }