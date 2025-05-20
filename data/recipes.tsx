import { supabase } from '../supaBaseClient';
import { RecipeItem } from './types';

export async function fetchRecipes():Promise<RecipeItem[]> {
  const { data, error } = await supabase.from('food').select('*')

  if (error) {console.log (error); return []}
 
  return ( data as RecipeItem[])
}

export async function fetchIngredients() {
  const { data, error } = await supabase.from('food').select('ingredients')

  if (error) {console.log (error); return []}
 
  return ( data )
}

export async function fetchCategories() {
  const { data, error } = await supabase.from('food').select('Category')

  if (error) {console.log (error); return []}
 
  return ( data )
}
