import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
export const appRoutes=[
    {path: 'home',component : HomeComponent},
    {path: 'recipeinfo',component : RecipeComponent},
    {path: 'mealcart',component : ShoppingListComponent}

]