export class Recipe{
    recipe_id : Number;
    recipe_name : string;
    recipe_description : string;
    prep_time: Number;
    cook_time: Number;
    recipe_subtitle: String;
    main_image: any;
    sub_image: any;
    calorie_per_100g: Number;
    create_time : any;
    update_time: any;
    recipe_steps: String;

    constructor(recipe_id : Number, recipe_name : string, recipe_description : string, prep_time: Number, cook_time: Number,
        recipe_subtitle: String, main_image: any, sub_image: any, calorie_per_100g: Number, create_time : any, update_time: any, recipe_steps:String){
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
        this.recipe_steps = recipe_steps;
    }
}