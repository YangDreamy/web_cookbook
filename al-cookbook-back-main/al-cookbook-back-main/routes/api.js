require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const Router = express.Router();
const dbConnection = require('../middlewares/mysql');
const apiUrl = '/api' ;
const fs = require('fs');
const bitmap = fs.readFileSync("public/images/test.png");
const outputfile = "output.png";

// initialization of database
var dataSql = fs.readFileSync(process.env.MYSQL_init).toString();
// delete the last '\r\n' in the .sql file
var numStr = 0;
for (var i = 1; i<dataSql.length-1; i++){
    if (dataSql.charAt(dataSql.length-i) == ';'){
        numStr = i;
        break;
    }
}
dataSql_2 = dataSql.slice(0, -numStr);
// cut .sql into queries
const dataArr = dataSql_2.toString().split(";");
// console.log(dataArr);
Router.get(apiUrl, function(req, res, next) {
    dataArr.forEach(query => {
        // console.log(query);
        if (query) {
          query += ";";
          dbConnection.query(query, (err, result) => {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
        });
        }
    });
    console.log("Database initialization ended");
    res.status(200).json({msg: "Database initialization ended"});
});

// upload recipe
const uploadRecipe = `INSERT INTO recipe (recipe_id, recipe_name) VALUES(?,?)`
Router.post(apiUrl+'/uploadRecipe', function(req, res, next) {
    dbConnection.query(uploadRecipe, [0,'test'], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// get all recipes
const getAllRecipes = `SELECT * FROM recipe WHERE 1=1`;
Router.get(apiUrl+'/getAllRecipes', (req, res) => {
    dbConnection.query(getAllRecipes, (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// result example:
// [{
//     "recipe_id": 1,
//     "recipe_name": "Stir-fried tomato with egg",
//     "recipe_description": null,
//     "prep_time": 5,
//     "cook_time": 10,
//     "recipe_subtitle": null,
//     "main_image": null,
//     "sub_image": null,
//     "calorie_per_100g": 74,
//     "create_time": null,
//     "update_time": null
// }]

// get recipe by recipe_id
const getRecipeById = `SELECT * FROM recipe WHERE recipe_id = ?`;
Router.post(apiUrl+'/getRecipeById', (req, res) => {
    // console.log(JSON.stringify(req.body))
    dbConnection.query(getRecipeById, [req.body.recipe_id], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// get recipe by recipe_name, using "LIKE"
const getRecipesByName = `SELECT * FROM recipe WHERE recipe_name LIKE "%`;
Router.post(apiUrl+'/getRecipesByName', (req, res) => {
    // console.log(JSON.stringify(req.body))
    dbConnection.query(getRecipesByName + req.body.recipe_name +'%"', (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// get recipes by category_id
const getRecipesByCategory = `SELECT * FROM recipe WHERE recipe_id IN ( \
    SELECT recipe_id FROM recipe_category WHERE category_id = ( \
    SELECT category_id FROM category WHERE category_id = ? ) )`;
Router.post(apiUrl+'/getRecipesByCategory', (req, res) => {
    // console.log(JSON.stringify(req.body))
    dbConnection.query(getRecipesByCategory, [req.body.category_id], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// get category by recipe_id
const getCategoryByRecipeId = `SELECT * FROM category WHERE category_id IN ( \
    SELECT category_id FROM recipe_category WHERE recipe_id = ?)`;
Router.post(apiUrl+'/getCategoryByRecipeId', (req, res) => {
    // console.log(JSON.stringify(req.body))
    dbConnection.query(getCategoryByRecipeId, [req.body.recipe_id], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// get recommended recipe
const getRecommendedRecipe = `SELECT * FROM recipe WHERE recipe_id IN ( \
    SELECT recipe_id FROM recipe_category WHERE category_id IN ( \
    SELECT category_id FROM recipe_category WHERE recipe_id = ? ))`;
Router.post(apiUrl+'/getRecommendedRecipe', (req, res) => {
    console.log(JSON.stringify(req.body))
    dbConnection.query(getRecommendedRecipe, [req.body.recipe_id], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// get all categories
const getAllCategories = `SELECT * FROM category WHERE 1=1`;
Router.get(apiUrl+'/getAllCategories', (req, res) => {
    dbConnection.query(getAllCategories, (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// result example:
// [{
//         "category_id": 1,
//         "category_name": "chinese food"
// }]

//get ingredients by recipe_id
const getIngredientsByRecipeId = `SELECT * FROM ingredient LEFT JOIN recipe_ingredient \
ON ingredient.ingredient_id = recipe_ingredient.ingredient_id WHERE recipe_id = ?`;
Router.post(apiUrl+'/getIngredientsByRecipeId', (req, res) => {
    dbConnection.query(getIngredientsByRecipeId, [req.body.recipe_id], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// result example:
// [{
//     "ingredient_id": 2,
//     "ingredient_name": "egg",
//     "calorie_per_100g": 147,
//     "ingredient_image": null
// }]

//get nutrition by recipe_id
const getNutritionbyRecipeId = `SELECT * FROM recipe_ingredient LEFT JOIN ingredient_nutrition \
    ON recipe_ingredient.ingredient_id = ingredient_nutrition.ingredient_id LEFT JOIN nutrition \
    ON ingredient_nutrition.nutrition_id = nutrition.nutrition_id \
    WHERE recipe_ingredient.recipe_id = ?`;
Router.post(apiUrl+'/getNutritionbyRecipeId', (req, res) => {
    dbConnection.query(getNutritionbyRecipeId, [req.body.recipe_id], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// result example:
// [{
//     "recipe_id": 1,
//     "ingredient_id": 2,
//     "quantity_g": 150, // the quantity of the ingredient (The unit of measurement is grams)
//     "nutrition_id": 1,
//     "amount_per_100g": 13, // the amount of that kind of nutrition per 100g
//     "nutrition_name": "protein" // the name of the nutrition
// }]

// add recipe to meal cart
const addRecipeToMealCart = `INSERT INTO meal_cart_recipe (meal_cart_id, recipe_id) VALUES(?,?);`;
Router.post(apiUrl+'/addRecipeToMealCart', (req, res) => {
    console.log(req.body);
    dbConnection.query(addRecipeToMealCart, [1,req.body.recipe_id], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// delete recipe from meal cart
const deleteRecipeFromMealCart = `DELETE FROM meal_cart_recipe WHERE meal_cart_id = ? AND recipe_id = ?`;
Router.post(apiUrl+'/deleteRecipeFromMealCart', (req, res) => {
    dbConnection.query(deleteRecipeFromMealCart, [1,req.body.recipe_id], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// get meal cart by meal_cart_id
const getMealCartById = `SELECT * FROM meal_cart_recipe LEFT JOIN recipe \
    ON meal_cart_recipe.recipe_id = recipe.recipe_id \
    WHERE meal_cart_recipe.meal_cart_id = ?`;
Router.post(apiUrl+'/getMealCartById', (req, res) => {
    dbConnection.query(getMealCartById, [1], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// result example:
// [{
//     "meal_cart_id": 1,
//     "recipe_id": 1,
//     "recipe_name": "Stir-fried tomato with egg",
//     "recipe_description": null,
//     "prep_time": 5,
//     "cook_time": 10,
//     "recipe_subtitle": null,
//     "main_image": null,
//     "sub_image": null,
//     "calorie_per_100g": 74,
//     "create_time": null,
//     "update_time": null
// }]

// getNutritionByMealCart
const getNutritionByMealCart = `SELECT nutrition.nutrition_id, nutrition.nutrition_name, SUM(amount_per_100g) AS amount FROM recipe_ingredient LEFT JOIN ingredient_nutrition \
    ON recipe_ingredient.ingredient_id = ingredient_nutrition.ingredient_id LEFT JOIN nutrition \
    ON ingredient_nutrition.nutrition_id = nutrition.nutrition_id \
    WHERE recipe_ingredient.recipe_id IN ( \
    SELECT recipe_id FROM meal_cart_recipe WHERE meal_cart_id = ?) GROUP BY nutrition.nutrition_id`;
Router.get(apiUrl+'/getNutritionByMealCart', (req, res) => {
    dbConnection.query(getNutritionByMealCart, [1], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// getCalorieByMealCart
const getCalorieByMealCart = `SELECT SUM(calorie_per_100g) AS calorie FROM meal_cart_recipe LEFT JOIN recipe \
ON meal_cart_recipe.recipe_id = recipe.recipe_id WHERE meal_cart_recipe.meal_cart_id = ?`;
Router.get(apiUrl+'/getCalorieByMealCart', (req, res) => {
    dbConnection.query(getCalorieByMealCart, [1], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

//getIngredientsByMealCart
const getIngredientsByMealCart = `SELECT SUM(quantity_g) AS quantity, ingredient_name FROM ingredient LEFT JOIN recipe_ingredient \
ON ingredient.ingredient_id = recipe_ingredient.ingredient_id WHERE recipe_id IN (\
SELECT recipe_id FROM meal_cart_recipe WHERE meal_cart_id = ?) GROUP BY ingredient.ingredient_id`;
Router.get(apiUrl+'/getIngredientsByMealCart', (req, res) => {
    dbConnection.query(getIngredientsByMealCart, [1], (err, result) => {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

// main apis end /////////////////////////////////////////////////////////////////////////////////




// test apis /////////////////////////////////////////////////////////////////////////////////////
const sql = 'SELECT * FROM testTable';
Router.get(apiUrl+'/test', function(req, res, next) {
    dbConnection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        res.status(200).json(result);
    });
});

Router.get(apiUrl+'/uploadImage', function(req, res, next) {
    fs.readFile("public/images/test.png", (err, data) => {
        dbConnection.query(`INSERT INTO testImage (image) VALUES(?)`, data, (err, res) => {
            res.status(200).json({msg: "upload complete"});
        });
    });
});

Router.get(apiUrl+'/getImage', function(req, res, next) {
    fs.readFile("public/images/test.png", (err, data) => {
        dbConnection.query(`SELECT * FROM testImage`, function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            console.log(result[0].image)
            var buffer = new Buffer.from(result[0].image);
            var bufferBase64 = buffer.toString('base64');
            fs.writeFileSync(outputfile, bufferBase64);
            console.log("New file output:", outputfile);
            res.send("<img src='data:image/png;base64, "+ bufferBase64 +"'/>");
        });
    });
});

Router.get(apiUrl+'/uploadTestRecipe', function(req, res, next) {
    fs.readFile("public/images/Stir-fried tomato with egg.png", (err, data) => {
        dbConnection.query(`INSERT INTO recipe (recipe_id, recipe_name, prep_time, cook_time, main_image, calorie_per_100g) VALUES(?, ?, ?, ?, ?, ?)`,
        ["1", "Stir-fried tomato with egg", 10, 10, data, 74], (err, result) => {
        });
    });
    fs.readFile("public/images/Steak.png", (err, data) => {
        dbConnection.query(`INSERT INTO recipe (recipe_id, recipe_name, prep_time, cook_time, main_image, calorie_per_100g) VALUES(?, ?, ?, ?, ?, ?)`,
        ["2", "Steak", 10, 20, data, 131], (err, result) => {
        });
    });
    fs.readFile("public/images/Cake.png", (err, data) => {
        dbConnection.query(`INSERT INTO recipe (recipe_id, recipe_name, prep_time, cook_time, main_image, calorie_per_100g) VALUES(?, ?, ?, ?, ?, ?)`,
        ["3", "Cake", 30, 60, data, 347], (err, result) => {
        });
    });
    fs.readFile("public/images/Macaron.png", (err, data) => {
        dbConnection.query(`INSERT INTO recipe (recipe_id, recipe_name, prep_time, cook_time, main_image, calorie_per_100g) VALUES(?, ?, ?, ?, ?, ?)`,
        ["4", "Macaron", 60, 90, data, 361], (err, result) => {
        });
    });
    res.status(200).json({msg: "upload complete"});
});

module.exports = Router;